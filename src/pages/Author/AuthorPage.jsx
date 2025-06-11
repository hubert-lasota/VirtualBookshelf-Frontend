import { useParams } from "react-router-dom";
import css from "./author.module.css";

export default function AuthorPage() {
  const { id } = useParams();
  const author = {};

  const authorStatisticCards = [
    {
      value: author.bookPage.total,
      label: "Książek",
      icon: <span className={css["stat-icon"]}>{"Book open"}</span>,
    },
    {
      value: author.ratingPage.total,
      label: "Ocen",
      icon: <span>{"users"}</span>,
    },
    {
      value: author.averageRating,
      label: "Średnia ocen",
      icon: <span className={css["stat-icon"]}>{"star"}</span>,
    },
  ];

  return (
    <div className={css["page"]}>
      <div className={css["container"]}>
        <header className={css["header"]}>
          <img
            src={author.photoUrl}
            className={css["Author-photo"]}
            alt={author.name}
          />
        </header>
        <section className={css["Author-info"]}>
          <h1 className={css["Author-name"]}>{author.name}</h1>
        </section>
        <section className={css["Author-statistics"]}>
          {authorStatisticCards.map((card, index) => (
            <div className={css["stat-Card"]} key={index}>
              {card.icon}
              <div className={css["stat-content"]}>
                <span className={css["stat-value"]}>{card.value}</span>
                <span className={css["stat-Label"]}>{card.label}</span>
              </div>
            </div>
          ))}
        </section>
        {"Book grid"}
        {"Review Component"}
      </div>
    </div>
  );
}
