import HomeBookRecommendation from "./HomeBookRecommendation";
import HomeHeader from "./HomeHeader";
import css from "./home.module.css";

export default function Home() {
  return (
    <div className={css["home"]}>
      <HomeHeader />
      <HomeBookRecommendation />
    </div>
  );
}
