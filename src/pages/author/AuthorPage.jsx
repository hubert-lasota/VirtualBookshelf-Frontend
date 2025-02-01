import { useParams } from "react-router-dom";
import css from "./author.module.css";

export default function AuthorPage() {
  const { id } = useParams();
  const author = {};

  const authorStatisticCards = [
    {
      value: author.bookPage.total,
      label: "Książek",
      icon: <span className={css["stat-icon"]}>{"book open"}</span>,
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
            className={css["author-photo"]}
            alt={author.name}
          />
        </header>
        <section className={css["author-info"]}>
          <h1 className={css["author-name"]}>{author.name}</h1>
        </section>
        <section className={css["author-statistics"]}>
          {authorStatisticCards.map((card, index) => (
            <div className={css["stat-card"]} key={index}>
              {card.icon}
              <div className={css["stat-content"]}>
                <span className={css["stat-value"]}>{card.value}</span>
                <span className={css["stat-label"]}>{card.label}</span>
              </div>
            </div>
          ))}
        </section>
        {"book grid"}
        {"Rating Component"}
      </div>
    </div>
  );
}
