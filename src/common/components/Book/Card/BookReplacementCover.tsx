import { Stack, StackProps, useTheme } from "@mui/material";
import { BookOpenIcon } from "lucide-react";

export default function BookReplacementCover({ sx, ...props }: StackProps) {
  const theme = useTheme();

  return (
    <Stack
      sx={[
        {
          justifyContent: "center",
          alignItems: "center",
          backgroundImage: "linear-gradient(to bottom right, #eff6ff, #e0e7ff)",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    >
      <BookOpenIcon
        style={{
          width: "45px",
          height: "45px",
          color: theme.palette.primary["200"],
        }}
      />
    </Stack>
  );
}
