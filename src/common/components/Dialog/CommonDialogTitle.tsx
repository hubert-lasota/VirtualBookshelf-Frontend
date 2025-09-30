import { Stack, Typography } from "@mui/material";
import { ReactNode } from "react";
import { useDialogContext } from "../../context/DialogContext";
import DialogCloseButton from "./DialogCloseButton";

type Props = {
  title: ReactNode;
  subtitle?: ReactNode;
  showDivider?: boolean;
};

export default function CommonDialogTitle({
  title,
  subtitle,
  showDivider = true,
}: Props) {
  const { onClose } = useDialogContext();

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      sx={(theme) => ({
        padding: theme.spacing(2, 3),
        borderBottom: showDivider
          ? `1px solid ${theme.palette.divider}`
          : undefined,
        backgroundColor: theme.palette.background.default,
      })}
    >
      <Stack>
        <Typography fontWeight={500} fontSize="1.3rem" gutterBottom>
          {title}
        </Typography>
        {subtitle && (
          <Typography color="textSecondary" variant="body2" gutterBottom>
            {subtitle}
          </Typography>
        )}
      </Stack>
      <Stack justifyContent="flex-end">
        <DialogCloseButton onClose={onClose} />
      </Stack>
    </Stack>
  );
}
