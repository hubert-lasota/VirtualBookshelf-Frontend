import BookRecommendation from "./BookRecommendation.jsx";
import Header from "./Header.jsx";
import css from "./home.module.css";

export default function Home() {
  return (
    <div className={css["home"]}>
      <Header />
      <BookRecommendation />
    </div>
  );
}
