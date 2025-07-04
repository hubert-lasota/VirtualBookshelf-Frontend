import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import { unwrapResponseData } from "../apiUtils";
import { ReviewFormValues, ReviewResponse } from "../../models/reviewModels";
import { useUserContext } from "../../auth/UserContext";
import { useSnackbar } from "notistack";
import { PaginatedResponse } from "../apiModels";

const BASE_ENDPOINT = "/v1/book-reviews";

const getQueryKey = (page: number, bookId: number) => [
  "book-reviews",
  { page, bookId },
];

type UseGetBookReviewParams = {
  page: number;
  bookId: number;
};

export const useGetBookReviews = ({ page, bookId }: UseGetBookReviewParams) =>
  useQuery<unknown, unknown, PaginatedResponse<ReviewResponse, "reviews">>({
    queryKey: getQueryKey(page, bookId),
    queryFn: () =>
      axiosInstance
        .get(BASE_ENDPOINT, { params: { page, bookId } })
        .then(unwrapResponseData),
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
      queryClient.invalidateQueries({ queryKey: getQueryKey(0) }),
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
        .put(`${BASE_ENDPOINT}/${reviewId}`, review)
        .then(unwrapResponseData),

    onSuccess: () => {
      enqueueSnackbar({
        variant: "success",
        message: isPlLanguage
          ? "Poprawnie zaktualizowano recenzję"
          : "Successfully updated review",
      });
    },

    onMutate: async ({ review, reviewId }) => {
      await queryClient.cancelQueries({ queryKey: ["book-reviews"] });

      const queries = queryClient.getQueriesData<
        PaginatedResponse<ReviewResponse, "reviews">
      >({
        queryKey: ["book-reviews"],
      });

      const previousReviews = new Map(queries);

      queries.forEach(([queryKey, pageData]) => {
        if (!pageData) return;

        const reviewIndex = pageData.reviews.findIndex(
          (rev) => rev.id === reviewId,
        );

        if (reviewIndex !== -1) {
          queryClient.setQueryData(queryKey, {
            ...pageData,
            reviews: pageData.reviews.map((rev: ReviewResponse) =>
              rev.id === reviewId ? { ...rev, ...review } : rev,
            ),
          });
        }
      });

      return { previousReviews };
    },

    onError: (_, __, context: any) => {
      revertReviewsState(queryClient, context?.previousReviews);

      enqueueSnackbar({
        variant: "error",
        message: isPlLanguage
          ? "Wystąpił błąd podczas aktualizacji recenzji"
          : "Error occurred while updating review",
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["book-reviews"] });
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

    onSuccess: () => {
      enqueueSnackbar({
        variant: "success",
        message: isPlLanguage
          ? "Poprawnie usunięto recenzję"
          : "Successfully deleted review",
      });
    },

    onMutate: async ({ reviewId }) => {
      await queryClient.cancelQueries({ queryKey: ["book-reviews"] });

      const queries = queryClient.getQueriesData<
        PaginatedResponse<ReviewResponse, "reviews">
      >({
        queryKey: ["book-reviews"],
      });

      const previousReviews = new Map(queries);

      queries.forEach(([queryKey, pageData]) => {
        if (!pageData) return;

        const hasReview = pageData.reviews.some((rev) => rev.id === reviewId);

        if (hasReview) {
          queryClient.setQueryData(queryKey, {
            ...pageData,
            reviews: pageData.reviews.filter(
              (rev: ReviewResponse) => rev.id !== reviewId,
            ),
          });
        }
      });

      return { previousReviews };
    },

    onError: (_, __, context: any) => {
      revertReviewsState(queryClient, context?.previousReviews);

      enqueueSnackbar({
        variant: "error",
        message: isPlLanguage
          ? "Wystąpił błąd podczas usuwania recenzji"
          : "Error occurred while deleting review",
      });
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["book-reviews"] });
    },
  });
}

const revertReviewsState = (
  queryClient: QueryClient,
  previousReviews: Map<unknown, unknown>,
) => {
  if (!previousReviews) return;

  previousReviews.forEach((value, queryKey) => {
    queryClient.setQueryData(queryKey, value);
  });
};
