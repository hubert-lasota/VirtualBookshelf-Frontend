import { CardMedia, CardMediaProps } from "@mui/material";
import { useBookContext } from "./BookContext";

export default function BookCover(props: CardMediaProps) {
  const { title, coverUrl } = useBookContext();
  return <CardMedia src={coverUrl} title={title} {...props} />;
}
