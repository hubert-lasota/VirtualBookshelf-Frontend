import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { BookshelfBookResponse } from "../../models/bookshelfBookModels";
import axiosInstance from "../axiosInstance";
import {
  BookshelfBookNoteFormValues,
  BookshelfBookNoteResponse,
} from "../../models/bookshelfBookNoteModels";
import { unwrapResponseData } from "../apiUtils";

const BASE_ENDPOINT = "/v1/bookshelf-book-notes";

type GetBookshelfBookNotesResult = {
  notes: BookshelfBookNoteResponse[];
};

const getQueryKey = (bookshelfBookId: BookshelfBookResponse["id"]) => [
  "bookshelf-book-notes",
  bookshelfBookId,
];

export const useGetBookshelfBookNotes = (
  bookshelfBookId: BookshelfBookResponse["id"],
) =>
  useQuery<GetBookshelfBookNotesResult>({
    queryKey: getQueryKey(bookshelfBookId),
    queryFn: () =>
      axiosInstance
        .get(BASE_ENDPOINT, {
          params: { bookshelfBookId },
        })
        .then(unwrapResponseData),
  });

type CreateBookshelfBookNoteParams = {
  bookshelfBookId: BookshelfBookResponse["id"];
  note: BookshelfBookNoteFormValues;
};

export function useCreateBookshelfBookNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ note, bookshelfBookId }: CreateBookshelfBookNoteParams) =>
      axiosInstance
        .post(BASE_ENDPOINT, { ...note, bookshelfBookId })
        .then(unwrapResponseData),

    onMutate: ({ bookshelfBookId, note }) =>
      //@ts-ignore
      handleMutate(queryClient, bookshelfBookId, (notes) => [...notes, note]),

    onError: (err, variables, context) =>
      handleError(
        queryClient,
        "creating",
        variables.bookshelfBookId,
        err,
        variables,
        context,
      ),

    onSettled: (_res, _err, { bookshelfBookId }) =>
      handleSettled(queryClient, bookshelfBookId),
  });
}

type UpdateBookshelfBookNoteParams = {
  bookshelfBookId: BookshelfBookResponse["id"];
  note: BookshelfBookNoteFormValues;
  noteId: BookshelfBookNoteResponse["id"];
};

export function useUpdateBookshelfBookNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ noteId, note }: UpdateBookshelfBookNoteParams) =>
      axiosInstance.patch(`${BASE_ENDPOINT}/${noteId}`, note),

    onMutate: ({ bookshelfBookId, note, noteId }) =>
      handleMutate(queryClient, bookshelfBookId, (notes) => {
        const index = notes.findIndex((n) => n.id === noteId)!;
        // @ts-ignore
        notes[index] = { ...notes[index], ...note };
        return notes;
      }),

    onError: (err, variables, context) =>
      handleError(
        queryClient,
        "updating",
        variables.bookshelfBookId,
        err,
        variables,
        context,
      ),
  });
}

type DeleteBookshelfBookNoteParams = {
  bookshelfBookId: BookshelfBookResponse["id"];
  noteId: BookshelfBookNoteResponse["id"];
};

export function useDeleteBookshelfBookNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ noteId }: DeleteBookshelfBookNoteParams) =>
      axiosInstance.delete(`${BASE_ENDPOINT}/${noteId}`),

    onMutate: ({ noteId, bookshelfBookId }: DeleteBookshelfBookNoteParams) =>
      handleMutate(queryClient, bookshelfBookId, (notes) =>
        notes.filter((note) => note.id !== noteId),
      ),

    onError: (error, variables, context) =>
      handleError(
        queryClient,
        "deleting",
        variables.bookshelfBookId,
        error,
        variables,
        context,
      ),

    onSettled: (_response, _error, { bookshelfBookId }) =>
      handleSettled(queryClient, bookshelfBookId),
  });
}

const handleError = (
  queryClient: QueryClient,
  actionType: "creating" | "updating" | "deleting",
  bookshelfBookId: BookshelfBookResponse["id"],
  error: Error,
  variables: unknown,
  context:
    | {
        previousNotes: GetBookshelfBookNotesResult | undefined;
      }
    | undefined,
) => {
  console.error(
    `Error occurred in ${actionType} bookshelf book note. Error: ${error}. Variables: ${variables}`,
  );
  queryClient.setQueryData<GetBookshelfBookNotesResult>(
    getQueryKey(bookshelfBookId),
    context!.previousNotes,
  );
};

type UpdateFn = (
  notes: BookshelfBookNoteResponse[],
) => BookshelfBookNoteResponse[];

const handleMutate = async (
  queryClient: QueryClient,
  bookshelfBookId: BookshelfBookResponse["id"],
  updateFn: UpdateFn,
) => {
  await queryClient.cancelQueries({ queryKey: getQueryKey(bookshelfBookId) });
  const prev = {
    previousNotes: queryClient.getQueryData<GetBookshelfBookNotesResult>(
      getQueryKey(bookshelfBookId),
    ),
  };

  queryClient.setQueryData<GetBookshelfBookNotesResult>(
    getQueryKey(bookshelfBookId),
    (noteResult: GetBookshelfBookNotesResult | undefined) => {
      const notes = noteResult ? [...noteResult.notes] : [];
      return { notes: updateFn(notes) };
    },
  );

  return prev;
};

const handleSettled = (
  queryClient: QueryClient,
  bookshelfBookId: BookshelfBookResponse["id"],
) => queryClient.invalidateQueries({ queryKey: getQueryKey(bookshelfBookId) });
