import css from "./bookshelf.module.css";
import { FaBook } from "react-icons/fa";

export default function EmptyBookshelf() {
  return (
    <div className={`${css["card"]} ${css["empty"]}`}>
      <FaBook />
      <p>Twój regał jest pusty</p>
    </div>
  );
}
