import DialogTitleWithCloseButton from "./DliagotTitleWithCloseButton";
import { Typography } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  onClose: () => void;
  title: ReactNode;
  subtitle: ReactNode;
  showDivider?: boolean;
};

export default function CommonDialogTitle({
  onClose,
  title,
  subtitle,
  showDivider = true,
}: Props) {
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
      <Typography fontWeight={600} fontSize="1.3rem" gutterBottom>
        {title}
      </Typography>
      <Typography color="textSecondary" gutterBottom>
        {subtitle}
      </Typography>
    </DialogTitleWithCloseButton>
  );
}
