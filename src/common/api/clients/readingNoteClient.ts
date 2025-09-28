import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { ReadingBookResponse } from "../../models/readingBookModels";
import axiosInstance from "../axiosInstance";
import {
  ReadingNoteFormValues,
  ReadingNoteResponse,
} from "../../models/readingNoteModels";
import { unwrapResponseData } from "../apiUtils";

const BASE_ENDPOINT = "/v1/reading-notes";

type ReadingNoteListResponse = {
  notes: ReadingNoteResponse[];
};

const getQueryKey = (readingBookId: ReadingBookResponse["id"]) => [
  "reading-notes",
  readingBookId,
];
type UseGetReadingBookNotesParams = {
  readingBookId: ReadingBookResponse["id"];
  query: string;
};
export const useGetReadingBookNotes = ({
  readingBookId,
  query,
}: UseGetReadingBookNotesParams) =>
  useQuery<ReadingNoteListResponse>({
    queryKey: getQueryKey(readingBookId),
    queryFn: () =>
      axiosInstance
        .get(BASE_ENDPOINT, {
          params: { readingBookId, query: query.trim() || undefined },
        })
        .then(unwrapResponseData),
  });

type CreateReadingNoteParams = {
  readingBookId: ReadingBookResponse["id"];
  note: ReadingNoteFormValues;
};

export function useCreateReadingNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ note, readingBookId }: CreateReadingNoteParams) =>
      axiosInstance
        .post(BASE_ENDPOINT, { ...note, readingBookId })
        .then(unwrapResponseData),

    onMutate: ({ readingBookId, note }) =>
      //@ts-ignore
      handleMutate(queryClient, readingBookId, (notes) => [...notes, note]),

    onError: (err, variables, context) =>
      handleError(
        queryClient,
        "creating",
        variables.readingBookId,
        err,
        variables,
        context,
      ),

    onSettled: (_res, _err, { readingBookId }) =>
      handleSettled(queryClient, readingBookId),
  });
}

type UpdateReadingNoteParams = {
  readingBookId: ReadingBookResponse["id"];
  note: ReadingNoteFormValues;
  noteId: ReadingNoteResponse["id"];
};

export function useUpdateReadingNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ noteId, note }: UpdateReadingNoteParams) =>
      axiosInstance.patch(`${BASE_ENDPOINT}/${noteId}`, note),

    onMutate: ({ readingBookId, note, noteId }) =>
      handleMutate(queryClient, readingBookId, (notes) => {
        const index = notes.findIndex((n) => n.id === noteId)!;
        // @ts-ignore
        notes[index] = { ...notes[index], ...note };
        return notes;
      }),

    onError: (err, variables, context) =>
      handleError(
        queryClient,
        "updating",
        variables.readingBookId,
        err,
        variables,
        context,
      ),
  });
}

type DeleteReadingNoteParams = {
  readingBookId: ReadingBookResponse["id"];
  noteId: ReadingNoteResponse["id"];
};

export function useDeleteReadingNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ noteId }: DeleteReadingNoteParams) =>
      axiosInstance.delete(`${BASE_ENDPOINT}/${noteId}`),

    onMutate: ({ noteId, readingBookId }: DeleteReadingNoteParams) =>
      handleMutate(queryClient, readingBookId, (notes) =>
        notes.filter((note) => note.id !== noteId),
      ),

    onError: (error, variables, context) =>
      handleError(
        queryClient,
        "deleting",
        variables.readingBookId,
        error,
        variables,
        context,
      ),

    onSettled: (_response, _error, { readingBookId }) =>
      handleSettled(queryClient, readingBookId),
  });
}

const handleError = (
  queryClient: QueryClient,
  actionType: "creating" | "updating" | "deleting",
  bookshelfBookId: ReadingBookResponse["id"],
  error: Error,
  variables: unknown,
  context:
    | {
        previousNotes: ReadingNoteListResponse | undefined;
      }
    | undefined,
) => {
  console.error(
    `Error occurred in ${actionType} reading note. Error: ${error}. Variables: ${variables}`,
  );
  queryClient.setQueryData<ReadingNoteListResponse>(
    getQueryKey(bookshelfBookId),
    context!.previousNotes,
  );
};

type UpdateFn = (notes: ReadingNoteResponse[]) => ReadingNoteResponse[];

const handleMutate = async (
  queryClient: QueryClient,
  readingBookId: ReadingBookResponse["id"],
  updateFn: UpdateFn,
) => {
  await queryClient.cancelQueries({ queryKey: getQueryKey(readingBookId) });
  const prev = {
    previousNotes: queryClient.getQueryData<ReadingNoteListResponse>(
      getQueryKey(readingBookId),
    ),
  };

  queryClient.setQueryData<ReadingNoteListResponse>(
    getQueryKey(readingBookId),
    (noteResult: ReadingNoteListResponse | undefined) => {
      const notes = noteResult ? [...noteResult.notes] : [];
      return { notes: updateFn(notes) };
    },
  );

  return prev;
};

const handleSettled = (
  queryClient: QueryClient,
  readingBookId: ReadingBookResponse["id"],
) => queryClient.invalidateQueries({ queryKey: getQueryKey(readingBookId) });
