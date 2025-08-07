import { CardMedia, CardMediaProps } from "@mui/material";
import { useBookContext } from "./BookContext";
import BookReplacementCover from "./BookReplacementCover";

export default function BookCover({ sx, ...props }: CardMediaProps) {
  const { title, coverUrl } = useBookContext();

  return coverUrl ? (
    <CardMedia
      image={coverUrl}
      title={title}
      component="img"
      sx={sx}
      {...props}
    />
  ) : (
    <BookReplacementCover sx={sx} {...props} />
  );
}
