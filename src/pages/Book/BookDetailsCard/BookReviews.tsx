import ReviewDetailsPaper from "../../../common/components/Review/ReviewDetailsPaper";
import useCreateBookReview, {
  useGetBookReviews,
} from "../../../common/api/clients/bookReviewClient";
import { ReviewFormValues } from "../../../common/models/reviewModels";
import { useState } from "react";
import { useBookDetailsContext } from "../BookDetailsContext";

export default function BookReviews() {
  const book = useBookDetailsContext();
  const [page, setPage] = useState(0);

  const { data: { reviews = [], pageMeta: { totalPages = 0 } = {} } = {} } =
    useGetBookReviews({
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
      totalReviews={book.totalReviews}
      averageRating={book.averageRating}
      onSubmitNewReview={onSubmit}
      page={page}
      onPageChange={(page) => setPage(page)}
      totalPages={totalPages}
      disableCreateReviewForm={!!book.review}
    />
  );
}
