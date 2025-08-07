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
          backgroundImage: `linear-gradient(to bottom right, ${theme.palette.primary["50"]}, ${theme.palette.primary["100"]})`,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    >
      <BookOpenIcon
        style={{
          width: "45px",
          height: "45px",
          color: theme.palette.primary["300"],
        }}
      />
    </Stack>
  );
}
