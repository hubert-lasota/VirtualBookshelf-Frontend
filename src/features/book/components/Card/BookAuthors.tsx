import { useBookContext } from "./BookContext";
import { Typography, TypographyProps } from "@mui/material";

export default function BookAuthors(props: TypographyProps) {
  const { authors } = useBookContext();
  return (
    <Typography color="textSecondary" variant="subtitle1" {...props}>
      {authors.map((author) => author.fullName).join(", ")}
    </Typography>
  );
}
