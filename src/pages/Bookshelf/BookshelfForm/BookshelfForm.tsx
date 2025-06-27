import { BookshelfDetailsFormValues } from "../../../common/models/bookshelfModels";
import AddBooksStep from "./AddBooksStep/AddBooksStep";
import { useState } from "react";
import BookshelfDetailsStep from "./BookDetailsStep/BookshelfDetailsStep";
import {
  Box,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { useUserContext } from "../../../common/auth/UserContext";
import { useBookshelfPageContext } from "../BookshelfPageContext";

export default function BookshelfForm() {
  const [step, setStep] = useState(0);
  const [bookshelfDetails, setBookshelfDetails] = useState<
    BookshelfDetailsFormValues | undefined
  >();

  const { currentBookshelf } = useBookshelfPageContext();

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const stepsLabels = [
    isPlLanguage ? "Szczegóły regału" : "Bookshelf details",
    isPlLanguage ? "Książki regału" : "Bookshelf books",
  ];

  const isEditing = !!currentBookshelf;
  return (
    <Box
      sx={(theme) => ({
        padding: theme.spacing(4),
        paddingLeft: theme.spacing(6),
        width: "100%",
        overflowY: "auto",
      })}
    >
      <Paper
        variant="outlined"
        component={Stack}
        spacing={2}
        sx={(theme) => ({ padding: theme.spacing(3) })}
      >
        <Typography variant="h5" gutterBottom>
          {isPlLanguage
            ? isEditing
              ? `Edytuj regał: ${currentBookshelf!.name}`
              : "Dodaj nowy regał"
            : isEditing
              ? `Edit bookshelf: ${currentBookshelf!.name}`
              : "Add new bookshelf"}
        </Typography>
        <Stepper activeStep={step}>
          {stepsLabels.map((label) => (
            <Step key={`step-${label}`}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {step === 0 && (
          <BookshelfDetailsStep
            setBookshelfDetails={setBookshelfDetails}
            nextStep={() => setStep((prev) => prev + 1)}
          />
        )}

        {step === 1 && (
          <AddBooksStep
            previousStep={() => setStep((prev) => prev - 1)}
            bookshelfDetails={bookshelfDetails!}
          />
        )}
      </Paper>
    </Box>
  );
}
