import DialogTitleWithCloseButton from "./DliagotTitleWithCloseButton";
import { Typography } from "@mui/material";
import { ReactNode } from "react";
import { useDialogContext } from "../../context/DialogContext";

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
    <DialogTitleWithCloseButton
      onClose={onClose}
      sx={(theme) => ({
        borderBottom: showDivider
          ? `1px solid ${theme.palette.divider}`
          : undefined,
        backgroundColor: theme.palette.background.default,
      })}
    >
      <Typography fontWeight={500} fontSize="1.3rem" gutterBottom>
        {title}
      </Typography>
      {subtitle ?? (
        <Typography color="textSecondary" gutterBottom>
          {subtitle}
        </Typography>
      )}
    </DialogTitleWithCloseButton>
  );
}
