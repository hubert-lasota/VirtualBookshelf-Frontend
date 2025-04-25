import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import css from "./search.module.css";
import useMessageResolver from "../../../../features/message/useMessageResolver.js";
import SearchModal from "./SearchModal.jsx";

export default function SearchButton() {
  const message = useMessageResolver("Home:Header:SearchButton");
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className={css["btn-container"]}
        onClick={() => setIsModalOpen(true)}
      >
        <FaSearch className={css["btn-icon"]} />
        <span className={css["btn-text"]}>{message()}</span>
      </div>
      <SearchModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
