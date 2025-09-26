import Toolbar from "../../common/components/ui/Toolbar/Toolbar";
import { useBookshelfPageContext } from "./BookshelfPageContext";
import BookFilterDialogContent from "../../common/components/Book/FilterDialogContent/BookFilterDialogContent";
import { useEffect, useState } from "react";
import { BookFilter } from "../../common/models/bookModels";

export default function BookshelfToolbar() {
  const { query, onQueryChange, filter, setFilter, resetFilter } =
    useBookshelfPageContext();

  const [unsavedFilter, setUnsavedFilter] = useState<BookFilter>(filter);

  useEffect(() => {
    setUnsavedFilter(filter);
  }, [filter]);

  return (
    <Toolbar
      searchTextFieldProps={{
        value: query,
        onChange: (e) => onQueryChange(e.target.value),
      }}
      filterButtonProps={{
        onApply: () => setFilter(unsavedFilter),
        onReset: resetFilter,
        content: (
          <BookFilterDialogContent
            filter={unsavedFilter}
            setFilter={setUnsavedFilter}
          />
        ),
      }}
    />
  );
}
