import Toolbar from "../../common/components/Toolbar/Toolbar";
import { useBookshelfPageContext } from "./BookshelfPageContext";
import BookFilterFields from "../../common/components/Book/FilterDialogContent/BookFilterFields";
import { ChallengeFilter } from "../../common/models/challengeModels";
import { ApiSort } from "../../common/api/apiModels";

export default function BookshelfToolbar() {
  const { filter, setFilter } = useBookshelfPageContext();

  return (
    <Toolbar
      searchTextFieldProps={{
        onDebounceValueChange: (value) =>
          setFilter((prev) => ({ ...prev, query: value })),
      }}
      filterButtonProps={{
        defaultValues: filter,
        onSubmit: (newFilter: ChallengeFilter) =>
          setFilter((prev) => ({ ...prev, ...newFilter })),
        content: <BookFilterFields />,
      }}
      sortButtonProps={{
        onSubmit: (sort: ApiSort) => setFilter((prev) => ({ ...prev, sort })),
        fields: [],
      }}
    />
  );
}
