import { useBookContext } from "./BookContext";
import { Typography, TypographyProps } from "@mui/material";

export default function BookAuthors(props: TypographyProps) {
  const { authors } = useBookContext();
  return (
    <Typography {...props}>
      {authors.map((author) => author.fullName).join(", ")}
    </Typography>
  );
}
