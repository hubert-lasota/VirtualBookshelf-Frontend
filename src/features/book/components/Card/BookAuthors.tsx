import { useBookContext } from "./BookContext";

export default function BookAuthors(props: TypographyProps) {
  const { authors } = useBookContext();
  return <Typography {...props}>{authors.join(", ")}</Typography>;
}
