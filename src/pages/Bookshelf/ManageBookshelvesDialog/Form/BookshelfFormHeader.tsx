import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import { Bookshelf } from "../../../../features/bookshelf/models";
import { useUserContext } from "../../../../features/user/UserContext";

type BookshelfFormHeaderProps = {
  isEditing: boolean;
  bookshelf: Bookshelf | null;
  step: number;
};

export default function BookshelfFormHeader({
  isEditing,
  bookshelf,
  step,
}: BookshelfFormHeaderProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const stepsLabels = [
    isPlLanguage ? "Szczegóły regału" : "Bookshelf details",
    isPlLanguage ? "Książki regału" : "Bookshelf books",
  ];
  return (
    <>
      <Typography
        variant="h5"
        sx={(theme) => ({
          borderBottom: `1.5px solid ${theme.palette.divider}`,
        })}
        gutterBottom
      >
        {isPlLanguage
          ? isEditing
            ? `Edytuj regał: ${bookshelf!.name}`
            : "Stwórz nowy regał"
          : isEditing
            ? `Edit bookshelf: ${bookshelf!.name}`
            : "Create new Bookshelf"}
      </Typography>
      <Stepper activeStep={step}>
        {stepsLabels.map((label) => (
          <Step key={`step-${label}`}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
}
