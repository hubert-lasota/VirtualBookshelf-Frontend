import css from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={css["page"]}>
      <h1 className={css["header"]}>404 Not Found</h1>
    </div>
  );
}
