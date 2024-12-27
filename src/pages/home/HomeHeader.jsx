import css from "./home.module.css";
import HomeAccountMenu from "./HomeAccountMenu";
import HomeSearchInput from "./HomeSearchInput";

export default function HomeHeader() {
  return (
    <header className={css["header"]}>
      <div className={css["header__first-row"]}>
        <HomeSearchInput />
        <div className={css["header__first-row__right-side"]}>
          <HomeAccountMenu />
        </div>
      </div>
      <div className={css["header__second-row"]}></div>
    </header>
  );
}
