import css from "./home.module.css";
import AccountMenu from "./AccountMenu.jsx";
import SearchButton from "./search/SearchButton.jsx";
import GlobalNavHeader from "../../components/header/GlobalNavHeader.jsx";

export default function Header() {


  return (
    <header className={css["header"]}>
      <div className={css["header__first-row"]}>
        <SearchButton />
        <div className={css["header__first-row__right-side"]}>
          <AccountMenu />
        </div>
      </div>
      <GlobalNavHeader renderFixed={false}/>
    </header>
  );
}
