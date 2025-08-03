import { Stack, Typography } from "@mui/material";
import React from "react";

export type NavItemProps = {
  isSelected: boolean;
  label: string;
  icon: React.ElementType;
  onClick: () => void;
};

export default function NavItem({
  isSelected,
  label,
  icon,
  onClick,
}: NavItemProps) {
  const Icon = icon;
  return (
    <Stack
      onClick={onClick}
      direction="row"
      alignItems="center"
      spacing={2}
      sx={(theme) => ({
        "&:first-child": {
          marginTop: theme.spacing(1.5),
        },
        "&:last-child": {
          marginBottom: theme.spacing(1.5),
        },
        cursor: "pointer",

        borderRadius: theme.shape.borderRadius,
        paddingBlock: theme.spacing(1.25),
        paddingInline: theme.spacing(1.5),
        ...(isSelected
          ? {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary["100"],
            }
          : {
              color: theme.palette.text.primary,
              "&:hover": {
                backgroundColor: theme.palette.primary["300"],
                color: theme.palette.primary.contrastTextOnLight,
              },
            }),
      })}
    >
      <Icon />
      <Typography>{label}</Typography>
    </Stack>
  );
}
