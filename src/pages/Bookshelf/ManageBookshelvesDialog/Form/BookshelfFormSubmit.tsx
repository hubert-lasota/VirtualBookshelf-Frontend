import { Button, Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useUserContext } from "../../../../features/user/UserContext";
import { Bookshelf } from "../../../../features/bookshelf/models";

type BookshelfFormSubmitProps = {
  bookshelf: Bookshelf | null;
  step: number;
  onStepChange: (step: number) => void;
};

export default function BookshelfFormSubmit({
  bookshelf,
  step,
  onStepChange,
}: BookshelfFormSubmitProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();
  const { reset } = useFormContext<Bookshelf>();

  return (
    <Stack
      direction="row"
      gap={1.5}
      sx={(theme) => ({
        width: "100%",
        justifyContent: "flex-end",
        borderTop: `1.5px solid ${theme.palette.divider}`,
      })}
    >
      <Button
        onClick={() => {
          step === 0 ? reset(bookshelf || undefined) : onStepChange(step - 1);
        }}
      >
        {step === 0
          ? isPlLanguage
            ? "Anuluj"
            : "Cancel"
          : isPlLanguage
            ? "Wstecz"
            : "Previous"}
      </Button>
      <Button variant="contained" sx={{ mt: 1 }} type="submit">
        {step === 0
          ? isPlLanguage
            ? "Dalej"
            : "Next"
          : isPlLanguage
            ? "Zapisz"
            : "Save"}
      </Button>
    </Stack>
  );
}
