import React from "react";
import { Paper, Stack, Typography, useTheme } from "@mui/material";

type StatCardProps = {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  value: string | number;
  valueLabel: string;
};

export default function StatCard({
  title,
  icon,
  value,
  valueLabel,
}: StatCardProps) {
  const theme = useTheme();
  const Icon = icon;
  return (
    <Stack
      component={Paper}
      variant="outlined"
      sx={(theme) => ({
        padding: theme.spacing(3),
        borderRadius: theme.shape.borderRadius,
        boxShadow: theme.shadows[1],
        transition: theme.transitions.create("box-shadow"),
        "&:hover": {
          boxShadow: theme.shadows[4],
        },
      })}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1" fontWeight={600}>
          {title}
        </Typography>
        <Icon
          style={{
            width: "16px",
            height: "16px",
            color: theme.palette.primary.main,
          }}
        />
      </Stack>
      <Typography variant="h5" fontWeight={600} color="primary">
        {value}
      </Typography>
      <Typography color="textSecondary" variant="body2">
        {valueLabel}
      </Typography>
    </Stack>
  );
}
