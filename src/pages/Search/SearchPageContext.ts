import { createContext, useContext } from "react";
import { ResourceType } from "./models";
import { BookFilter, BookResponse } from "../../common/models/bookModels";
import { AuthorFilter, AuthorResponse } from "../../common/models/authorModels";
import { UserFilter, UserResponse } from "../../common/models/userModels";

type SearchPageContextValue = {
  resourceType: ResourceType;
  onResourceTypeChange: (resourceType: ResourceType) => void;
  query: string;
  onQueryChange: (query: string) => void;
  books: BookResponse[];
  authors: AuthorResponse[];
  users: UserResponse[];
  bookFilter: BookFilter;
  onBookFilterChange: (filter: BookFilter) => void;
  authorFilter: AuthorFilter;
  onAuthorFilterChange: (filter: AuthorFilter) => void;
  userFilter: UserFilter;
  onUserFilterChange: (filter: UserFilter) => void;
};

export const SearchPageContext = createContext<SearchPageContextValue | null>(
  null,
);

export const useSearchPageContext = () => {
  const context = useContext(SearchPageContext);
  if (!context) {
    throw new Error(
      "useSearchPageContext must be used within SearchPageContextProvider",
    );
  }
  return context as SearchPageContextValue;
};
