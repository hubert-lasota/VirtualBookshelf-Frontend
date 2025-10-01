import Toolbar from "../../common/components/Toolbar/Toolbar";
import { useSearchPageContext } from "./SearchPageContext";
import BookFilterFields from "../../common/components/Book/FilterDialogContent/BookFilterFields";
import { BookFilter } from "../../common/models/bookModels";
import { ApiSort } from "../../common/api/apiModels";

export default function SearchToolbar() {
  const { resourceType, bookFilter, onBookFilterChange } =
    useSearchPageContext();

  const content = (() => {
    switch (resourceType) {
      case "book":
        return <BookFilterFields />;
      case "author":
        return <BookFilterFields />;
      case "user":
        return <BookFilterFields />;
    }
  })();
  return (
    <Toolbar
      filterButtonProps={{
        content,
        onSubmit: (filter: BookFilter) => {
          onBookFilterChange({ ...bookFilter, ...filter });
        },
      }}
      sortButtonProps={{
        onSubmit: (sort: ApiSort) => {
          onBookFilterChange({ ...bookFilter, sort });
        },
        fields: [],
      }}
    />
  );
}
