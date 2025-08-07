import { useBookContext } from "./BookContext";
import { Typography, TypographyProps } from "@mui/material";

export default function BookTitle(props: TypographyProps) {
  const { title } = useBookContext();

  return (
    <Typography fontWeight={600} variant="h6" {...props}>
      {title}
    </Typography>
  );
}
