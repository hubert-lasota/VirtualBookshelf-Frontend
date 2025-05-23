import Modal from "../../../common/components/modal/Modal.jsx";
import { useDebounceValue } from "../../../common/hooks.js";
import css from "./search.module.css";
import { useState } from "react";
import TextInput from "../../../common/components/input/text_input/TextInput.jsx";
import { FaSearch } from "react-icons/fa";
import TabSelector from "./TabSelector.jsx";
import { IoMdClose } from "react-icons/io";
import useMessageResolver from "../../message/useMessageResolver.js";
import { SearchResult } from "./SearchResult.jsx";
import { useQuery } from "@tanstack/react-query";

// TODO should search everything books, authors, users, posts
export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounceValue(query);
  const { books, isLoading } = useQuery({
    queryKey: ["search", debouncedQuery],
    enabled: !!debouncedQuery,
  });
  const [selectedTab, setSelectedTab] = useState("all");
  const message = useMessageResolver("Home:Header:SearchModal");

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={css["modal-container"]}>
        <div className={css["header"]}>
          <TextInput
            placeholder={message("input:placeholder")(selectedTab)}
            style={{ width: "100%" }}
            startIcon={<FaSearch />}
            endIcon={
              query ? (
                <IoMdClose
                  style={{ cursor: "pointer", fontSize: "1.6rem" }}
                  onClick={() => setQuery("")}
                />
              ) : null
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <TabSelector selectedTab={selectedTab} onTabChange={setSelectedTab} />
        </div>
        <SearchResult books={books} isLoading={isLoading} query={query} />
      </div>
    </Modal>
  );
}
