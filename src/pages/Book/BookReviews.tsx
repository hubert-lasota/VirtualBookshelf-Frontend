import { BookResponse } from "../../common/models/bookModels";
import ReviewDetailsPaper from "../../common/components/Review/ReviewDetailsPaper";
import useCreateBookReview, {
  useGetBookReviews,
} from "../../common/api/clients/bookReviewClient";
import { ReviewFormValues } from "../../common/models/reviewModels";

type BookReviewsProps = {
  book: BookResponse;
};

export default function BookReviews({ book }: BookReviewsProps) {
  const { data: { reviews = [] } = {} } = useGetBookReviews({
    page: 0,
    bookId: book.id,
  });

  const { mutate } = useCreateBookReview();

  const onSubmit = (review: ReviewFormValues) => {
    mutate({ review, bookId: book.id });
  };

  return (
    <ReviewDetailsPaper
      reviews={reviews}
      averageRating={0}
      totalRatings={0}
      onSubmitNewReview={onSubmit}
    />
  );
}
