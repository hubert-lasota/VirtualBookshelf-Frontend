import { useBookContext } from "./BookContext";
import { Typography, TypographyProps } from "@mui/material";

export default function BookTitle(props: TypographyProps) {
  const { title } = useBookContext();

  return (
    <Typography textAlign="center" fontWeight={600} variant="body1" {...props}>
      {title}
    </Typography>
  );
}
