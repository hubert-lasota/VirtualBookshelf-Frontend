import Modal from "../../../components/modal/Modal.jsx";
import { useDebounceValue } from "../../../common/hooks.js";
import useSearchBooks from "../../../features/book/useSearchBooks.js";
import css from "./search.module.css";
import { useState } from "react";
import Input from "../../../components/input/Input.jsx";
import { FaSearch } from "react-icons/fa";
import TabSelector from "./TabSelector.jsx";

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounceValue(query);
  const { books } = useSearchBooks(debouncedQuery);
  const [selectedTab, setSelectedTab] = useState("title");

  const renderResult = () => {
    if (!query && !(books && books.length > 0)) {
      return <div>Zacznij szukac</div>;
    }
  };
// TODO - circular progress gdy piszemy, oraz x (end icon) do czyszczenia query
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={css["modal-container"]}>
        <div className={css["header"]}>
          <Input
            placeholder="Szukaj..."
            style={{ width: "100%" }}
            startIcon={<FaSearch />}
          />
          <TabSelector selectedTab={selectedTab} onTabChange={setSelectedTab} />
        </div>
        <div>{renderResult()}</div>
      </div>
    </Modal>
  );
}
