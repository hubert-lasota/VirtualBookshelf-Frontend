import css from "./bookshelf.module.css";
import { LuLibrary } from "react-icons/lu";
import Button from "../../common/components/button/Button.jsx";

export default function Header() {
  return (
    <header className={css["header"]}>
      <div className={css["logo"]}>
        <LuLibrary className={css["logo-icon"]} />
        <h1>Wirtualny Regał</h1>
      </div>
      <Button>Dodaj książkę</Button>
    </header>
  );
}
