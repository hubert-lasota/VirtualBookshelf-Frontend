import css from "../../../pages/book/book.module.css";

export default function Review({ rating }) {
  return (
    <div key={rating.id} className={css["container"]}>
      <div className={css["header"]}>
        <div className={css["user-info"]}>
          <h3>{rating.user.username}</h3>
          <p className={css["date"]}>
            {new Date(rating.createdAtTimestamp).toLocaleDateString()}
          </p>
        </div>
        <div>{"Star review"}</div>
      </div>
      <p className={css["justification"]}>{rating.justification}</p>
    </div>
  );
}
