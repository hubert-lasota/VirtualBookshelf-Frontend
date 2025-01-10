import css from "./book.module.css";

export default function BookTags({ tags }) {
  return (
    <section className={css["section"]}>
      <h2>Tagi</h2>
      <div className={css["tags-list"]}>
        {tags.map((tag) => (
          <span key={tag} className={css["tag"]}>
            {tag}
          </span>
        ))}
      </div>
    </section>
  );
}
