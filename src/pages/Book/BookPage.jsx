import { useParams } from "react-router-dom";
import css from "./book.module.css";
import BookHeader from "./BookHeader.jsx";
import BookDetails from "./BookDetails.jsx";
import BookTags from "./BookTags.jsx";
import BookRatings from "./BookRatings.jsx";
import NotFound from "../NotFound/NotFound.jsx";
import LoadingPage from "../../common/components/ui/Loading/LoadingPage.tsx";

export default function BookPage() {
  const { id } = useParams();
  // const { data, isLoading } = useQuery({
  //   queryKey: ["books", id],
  //   queryFn: () => getBookById(id),
  //   enabled: !!id,
  // });
  let data;
  let loading;
  if (isLoading) {
    return <LoadingPage />;
  }

  if (!data) {
    return <NotFound />;
  }

  return (
    <div className={css["page"]}>
      <BookHeader book={data} />
      <BookDetails book={data} />
      <BookTags tags={data.tags} />
      <BookRatings book={data} />
    </div>
  );
}
