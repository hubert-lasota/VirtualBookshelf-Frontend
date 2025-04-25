import css from "./header.module.css";
import AccountMenu from "./AccountMenu.jsx";
import SearchButton from "../../common/components/global_header/search/SearchButton.jsx";
import GlobalHeader from "../../common/components/global_header/GlobalHeader.jsx";

export default function Header() {
  return (
    <header className={css["container"]}>
      <div className={css["first-row"]}>
        <SearchButton />
        <div className={css["first-row__right-side"]}>
          <AccountMenu />
        </div>
      </div>
      <GlobalHeader renderFixed={false} />
    </header>
  );
}
