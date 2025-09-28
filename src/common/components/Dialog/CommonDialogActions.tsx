import SubmitButton from "../Button/SubmitButton";
import CancelButton from "../Button/CancelButton";
import { Stack } from "@mui/material";

type Props = {
  onClickCancel: () => void;
};

export default function CommonDialogActions({ onClickCancel }: Props) {
  return (
    <Stack
      spacing={1}
      direction="row"
      justifyContent="flex-end"
      sx={(theme) => ({
        width: "100%",
        backgroundColor: theme.palette.background.default,
        borderTop: `1px solid ${theme.palette.divider}`,
        padding: theme.spacing(2, 2),
      })}
    >
      <CancelButton onClick={onClickCancel} />
      <SubmitButton />
    </Stack>
  );
}
