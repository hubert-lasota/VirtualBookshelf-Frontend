import { Stack, Typography } from "@mui/material";

export type SessionStatProps = {
  value: string | number;
  label: string;
  color: "primary" | "success" | "info";
};

export default function SessionStat({ value, color, label }: SessionStatProps) {
  return (
    <Stack
      spacing={1}
      sx={(theme) => ({
        justifyContent: "center",
        alignItems: "center",
        borderRadius: theme.shape.borderRadius,
        padding: theme.spacing(2),
        backgroundColor: theme.palette[color]["50"],
        width: "100%",
      })}
    >
      <Typography
        variant="h5"
        sx={(theme) => ({
          color: theme.palette[color]["900"],
        })}
      >
        {value}
      </Typography>
      <Typography
        variant="subtitle2"
        sx={(theme) => ({
          color: theme.palette[color]["600"],
        })}
      >
        {label}
      </Typography>
    </Stack>
  );
}
