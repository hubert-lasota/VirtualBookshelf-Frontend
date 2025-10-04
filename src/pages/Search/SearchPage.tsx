import LoggedInPageContainer from "../LoggedInLayout/LoggedInPageContainer";
import { useUserContext } from "../../common/auth/UserContext";
import LoggedInPageTitle from "../LoggedInLayout/LoggedInPageTitle";
import { useState } from "react";
import { ResourceType } from "./models";
import { useGetBooks } from "../../common/api/clients/bookClient";
import ResourceGrid from "./ResourceGrid";
import SearchToolbar from "./SearchToolbar";
import { SearchPageContext } from "./SearchPageContext";
import { BookFilter } from "../../common/models/bookModels";
import { useGetAuthors } from "../../common/api/clients/authorClient";
import { AuthorFilter } from "../../common/models/authorModels";
import { useGetUsers } from "../../common/api/clients/userClient";
import { UserFilter } from "../../common/models/userModels";

export default function SearchPage() {
  const [bookFilter, setBookFilter] = useState<BookFilter>({});
  const [authorFilter, setAuthorFilter] = useState<AuthorFilter>({});
  const [userFilter, setUserFilter] = useState<UserFilter>({});

  const [query, setQuery] = useState("");
  const [resourceType, setResourceType] = useState<ResourceType>("book");

  const { data: { books = [] } = {} } = useGetBooks({
    page: 0,
    size: 100,
    ...bookFilter,
    query,
    enabled: resourceType === "book" && !!query,
  });

  const { data: { authors = [] } = {} } = useGetAuthors({
    page: 0,
    size: 100,
    ...authorFilter,
    query,
    enabled: resourceType === "author" && !!query,
  });

  const { data: { users = [] } = {} } = useGetUsers({
    page: 0,
    size: 100,
    ...userFilter,
    query,
    enabled: resourceType === "user" && !!query,
  });

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <SearchPageContext.Provider
      value={{
        resourceType,
        onResourceTypeChange: setResourceType,
        query,
        onQueryChange: setQuery,
        books,
        authors,
        users,
        bookFilter,
        onBookFilterChange: setBookFilter,
        authorFilter,
        onAuthorFilterChange: setAuthorFilter,
        userFilter,
        onUserFilterChange: setUserFilter,
      }}
    >
      <LoggedInPageContainer spacing={3}>
        <LoggedInPageTitle>
          {isPlLanguage
            ? "Szukaj książek, autorów oraz użytkowników"
            : "Search books, authors and users"}
        </LoggedInPageTitle>
        <SearchToolbar />
        <ResourceGrid />
      </LoggedInPageContainer>
    </SearchPageContext.Provider>
  );
}
