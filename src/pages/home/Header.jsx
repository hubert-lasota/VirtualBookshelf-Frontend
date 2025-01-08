import css from "./home.module.css";
import AccountMenu from "./AccountMenu.jsx";
import SearchInput from "./SearchInput.jsx";

export default function Header() {
  return (
    <header className={css["header"]}>
      <div className={css["header__first-row"]}>
        <SearchInput />
        <div className={css["header__first-row__right-side"]}>
          <AccountMenu />
        </div>
      </div>
      <div className={css["header__second-row"]}></div>
    </header>
  );
}
