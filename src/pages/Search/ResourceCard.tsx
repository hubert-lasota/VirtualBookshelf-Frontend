import { Paper, Stack, Typography } from "@mui/material";
import React from "react";

export type ResourceCardProps = {
  title: string;
  subtitle?: string;
  image: React.ReactNode;
  onClick: () => void;
};

export default function ResourceCard({
  title,
  subtitle,
  image,
  onClick,
}: ResourceCardProps) {
  return (
    <Stack
      onClick={onClick}
      spacing={1}
      component={Paper}
      variant="outlined"
      sx={(theme) => ({
        padding: theme.spacing(2),
        cursor: "pointer",
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[1],
        transition: theme.transitions.create("box-shadow"),
        "&:hover": {
          boxShadow: theme.shadows[4],
        },
      })}
    >
      {image}
      <Typography variant="h6" color="textPrimary">
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="subtitle1" color="textSecondary">
          {subtitle}
        </Typography>
      )}
    </Stack>
  );
}
