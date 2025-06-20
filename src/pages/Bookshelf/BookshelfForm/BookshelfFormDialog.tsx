import {
  BookshelfDetails,
  BookshelfResponse,
} from "../../../features/bookshelf/bookshelfModels";
import { Dialog, DialogProps } from "@mui/material";
import AddBooksStep from "./AddBooksStep/AddBooksStep";
import BookshelfFormHeader from "./BookshelfFormHeader";
import { useState } from "react";
import BookshelfDetailsStep from "./BookDetailsStep/BookshelfDetailsStep";

type BookshelfFormProps = {
  bookshelf?: BookshelfResponse;
} & Pick<DialogProps, "open" | "onClose">;

export default function BookshelfFormDialog({
  open,
  onClose,
  bookshelf,
}: BookshelfFormProps) {
  const [step, setStep] = useState(0);
  const [bookshelfDetails, setBookshelfDetails] = useState<
    BookshelfDetails | undefined
  >();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: (theme) => ({
            padding: theme.spacing(3),
            minHeight: "50%",
            minWidth: "70%",
            gap: theme.spacing(4),
          }),
        },
      }}
    >
      <BookshelfFormHeader
        bookshelf={bookshelf}
        step={step}
        onClose={onClose}
      />
      {step === 0 && (
        <BookshelfDetailsStep
          bookshelf={bookshelf}
          setBookshelfDetails={setBookshelfDetails}
          nextStep={() => setStep((prev) => prev + 1)}
          // @ts-ignore
          onClose={onClose}
        />
      )}

      {step === 1 && (
        <AddBooksStep
          onClose={onClose}
          previousStep={() => setStep((prev) => prev - 1)}
          bookshelfDetails={bookshelfDetails!}
          bookshelfId={bookshelf?.id}
        />
      )}
    </Dialog>
  );
}
