import { useParams } from "react-router-dom";
import useGetBookById from "../../features/book/useGetBookById.js";
import Loading from "../../components/loading/Loading.jsx";

export default function Book() {
  const { id } = useParams();
  const { book, isLoading } = useGetBookById(id);

  if (isLoading) {
    return <Loading variant="page" />;
  }

  return <div>{id}</div>;
}
