import css from "./global-header.module.css";

export default function GlobalHeaderContainer({ children }) {
  return <header className={css["header"]}>{children}</header>;
}
