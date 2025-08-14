import React from "react";
import { Stack, SxProps, Typography, useTheme } from "@mui/material";

export type InfoCardColor = "info" | "success" | "warning" | "secondary";

type InfoCardProps = {
  color: InfoCardColor;
  title: string;
  value: string | number;
  icon: React.ElementType;
  sx: SxProps;
};

const bgColors = {
  info: "#ecf6ff",
  success: "#f4fff4",
  warning: "#fff8ec",
  secondary: "#faf1ff",
};

export default function InfoCard({
  color,
  title,
  value,
  icon: Icon,
  sx,
}: InfoCardProps) {
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      sx={[
        {
          justifyContent: "space-between",
          border: `1px solid ${theme.palette[color].light}`,
          borderRadius: theme.shape.borderRadius,
          padding: theme.spacing(3),
          backgroundColor: bgColors[color],
          boxShadow: `0px 0px 7px -1px ${theme.palette[color].light}`,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <Stack>
        <Typography color={color} sx={{ fontSize: "14px" }}>
          {title}
        </Typography>
        <Typography
          sx={{
            color: theme.palette[color].dark,
            fontWeight: 600,
            fontSize: "30px",
          }}
        >
          {value}
        </Typography>
      </Stack>
      <Icon
        style={{
          color: theme.palette[color].light,
          width: "40px",
          height: "40px",
        }}
      />
    </Stack>
  );
}
