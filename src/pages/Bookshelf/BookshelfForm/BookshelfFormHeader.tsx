import {
  DialogProps,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useTheme,
} from "@mui/material";
import { BookshelfResponse } from "../../../features/bookshelf/bookshelfModels";
import { useUserContext } from "../../../features/user/UserContext";
import DialogCloseButton from "../../../common/components/Dialog/DialogCloseButton";

type BookshelfFormHeaderProps = {
  bookshelf?: BookshelfResponse;
  step: number;
} & Pick<DialogProps, "onClose">;

export default function BookshelfFormHeader({
  bookshelf,
  step,
  onClose,
}: BookshelfFormHeaderProps) {
  const theme = useTheme();
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const stepsLabels = [
    isPlLanguage ? "Szczegóły regału" : "Bookshelf details",
    isPlLanguage ? "Książki regału" : "Bookshelf books",
  ];

  const isEditing = !!bookshelf;
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
            : "Dodaj nowy regał"
          : isEditing
            ? `Edit bookshelf: ${bookshelf!.name}`
            : "Add new bookshelf"}
      </Typography>
      <DialogCloseButton onClose={onClose} right={theme.spacing(3)} />
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
