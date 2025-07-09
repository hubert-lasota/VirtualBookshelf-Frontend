import { BookResponse } from "../../common/models/bookModels";
import ReviewDetailsPaper from "../../common/components/Review/ReviewDetailsPaper";
import useCreateBookReview, {
  useGetBookReviews,
} from "../../common/api/clients/bookReviewClient";
import { ReviewFormValues } from "../../common/models/reviewModels";
import { useState } from "react";

type BookReviewsProps = {
  book: BookResponse;
};

export default function BookReviews({ book }: BookReviewsProps) {
  const [page, setPage] = useState(0);

  const { data: { reviews = [], totalPages = 0 } = {} } = useGetBookReviews({
    page,
    bookId: book.id,
  });

  const { mutate } = useCreateBookReview();

  const onSubmit = (review: ReviewFormValues) => {
    mutate({ review, bookId: book.id });
  };

  return (
    <ReviewDetailsPaper
      reviews={reviews}
      reviewStatistics={book.reviewStatistics}
      onSubmitNewReview={onSubmit}
      page={page}
      onPageChange={(page) => setPage(page)}
      totalPages={totalPages}
    />
  );
}
