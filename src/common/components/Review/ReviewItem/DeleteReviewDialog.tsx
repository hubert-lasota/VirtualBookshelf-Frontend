import DeleteEntityDialog from "../../ui/Dialog/DeleteEntityDialog";
import { useReviewContext } from "./ReviewContext";
import { useDeleteBookReview } from "../../../api/clients/bookReviewClient";
import { useUserContext } from "../../../auth/UserContext";

type DeleteReviewDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function DeleteReviewDialog({
  open,
  onClose,
}: DeleteReviewDialogProps) {
  const review = useReviewContext();

  const { mutate } = useDeleteBookReview();

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <DeleteEntityDialog
      open={open}
      onClose={onClose}
      onDelete={() => mutate({ reviewId: review.id })}
      title={isPlLanguage ? "Usuń recenzję" : "Delete review"}
      contentText={
        isPlLanguage
          ? "Czy aby na pewno chcesz usunąć recenzję?"
          : "Are you sure you want to delete this review?"
      }
    />
  );
}
