import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import { unwrapResponseData } from "../apiUtils";
import { ReviewFormValues, ReviewResponse } from "../../models/reviewModels";
import { useUserContext } from "../../auth/UserContext";
import { useSnackbar } from "notistack";
import { PageMeta } from "../apiModels";

const BASE_ENDPOINT = "/v1/book-reviews";
const QUERY_KEY = ["book-reviews"];

type UseGetBookReviewParams = {
  page: number;
  bookId: number;
};

type UseGetBookReviewsResult = {
  reviews: ReviewResponse[];
  pageMeta: PageMeta;
};

export const useGetBookReviews = (params: UseGetBookReviewParams) =>
  useQuery<UseGetBookReviewsResult>({
    queryKey: [...QUERY_KEY, params],
    queryFn: () =>
      axiosInstance.get(BASE_ENDPOINT, { params }).then(unwrapResponseData),
  });

type CreateBookReviewParams = {
  bookId: number;
  review: ReviewFormValues;
};

export default function useCreateBookReview() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ review, bookId }: CreateBookReviewParams) =>
      axiosInstance
        .post(BASE_ENDPOINT, { ...review, bookId })
        .then(unwrapResponseData),

    onSuccess: () =>
      enqueueSnackbar({
        variant: "success",
        message: isPlLanguage
          ? "Poprawnie dodano recenzję"
          : "Successfully added review",
      }),

    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: QUERY_KEY, exact: false }),
  });
}

type UpdateBookReviewParams = {
  reviewId: number;
  review: ReviewFormValues;
};

export function useUpdateBookReview() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ review, reviewId }: UpdateBookReviewParams) =>
      axiosInstance
        .patch(`${BASE_ENDPOINT}/${reviewId}`, review)
        .then(unwrapResponseData),

    onSuccess: () => {
      enqueueSnackbar({
        variant: "success",
        message: isPlLanguage
          ? "Poprawnie zaktualizowano recenzję"
          : "Successfully updated review",
      });
    },
    onError: () =>
      enqueueSnackbar({
        variant: "error",
        message: isPlLanguage
          ? "Wystąpił błąd podczas aktualizacji recenzji"
          : "Error occurred while updating review",
      }),

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY, exact: false });
    },
  });
}

type DeleteBookReviewParams = {
  reviewId: number;
};

export function useDeleteBookReview() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ reviewId }: DeleteBookReviewParams) =>
      axiosInstance
        .delete(`${BASE_ENDPOINT}/${reviewId}`)
        .then(unwrapResponseData),

    onSuccess: () =>
      enqueueSnackbar({
        variant: "success",
        message: isPlLanguage
          ? "Poprawnie usunięto recenzję"
          : "Successfully deleted review",
      }),

    onError: () =>
      enqueueSnackbar({
        variant: "error",
        message: isPlLanguage
          ? "Wystąpił błąd podczas usuwania recenzji"
          : "Error occurred while deleting review",
      }),

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["book-reviews"] });
    },
  });
}
