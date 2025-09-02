import ViewContainer from "../ViewLayout/ViewContainer";
import { useUserContext } from "../../common/auth/UserContext";
import ViewTitle from "../ViewLayout/ViewTitle";
import { useState } from "react";
import { useDebounceValue } from "../../common/hooks";
import ToolbarContainer from "../../common/components/ui/Toolbar/ToolbarContainer";
import QueryTextFieldWithResourceSelect from "./QueryTextFieldWithResourceSelect";
import FilterButton from "./FilterButton";
import { ResourceType } from "./models";
import { useGetBooks } from "../../common/api/clients/bookClient";
import ResourceGrid from "./ResourceGrid";

export default function SearchView() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounceValue(query);
  const [resourceType, setResourceType] = useState<ResourceType>("book");

  const isBookEnabled = resourceType === "book" && !!debouncedQuery;

  const { data: { books = [] } = {} } = useGetBooks({
    page: 0,
    size: 10,
    query: debouncedQuery,
    enabled: isBookEnabled,
  });

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <ViewContainer spacing={3}>
      <ViewTitle>
        {isPlLanguage
          ? "Szukaj książek, autorów oraz użytkowników"
          : "Search books, authors and users"}
      </ViewTitle>
      <ToolbarContainer>
        <QueryTextFieldWithResourceSelect
          query={query}
          onQueryChange={setQuery}
          resourceType={resourceType}
          onResourceTypeChange={setResourceType}
        />
        <FilterButton />
      </ToolbarContainer>
      <ResourceGrid resources={books} resourceType={resourceType} />
    </ViewContainer>
  );
}
