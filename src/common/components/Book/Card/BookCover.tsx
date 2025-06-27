import { CardMedia, CardMediaProps } from "@mui/material";
import { useBookContext } from "./BookContext";

export default function BookCover(props: CardMediaProps) {
  const { title, coverUrl } = useBookContext();

  return (
    <CardMedia
      image={coverUrl || "src/assets/book_cover.jpg"}
      title={title}
      component="img"
      {...props}
    />
  );
}
