import { useDebounceValue } from "../../hooks";
import { useState } from "react";
import {
  CircularProgress,
  DialogProps,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { ResourceType, useSearch } from "../../api/clients/searchClient";
import { useUserContext } from "../../auth/UserContext";
import { BookResponse } from "../../models/bookModels";
import BookResult from "./Result/BookResult";
import { PaginatedResponse } from "../../api/apiModels";
import SelectResourceType from "./SelectResourceType";
import SearchIcon from "@mui/icons-material/Search";
import DialogCloseButton from "../Dialog/DialogCloseButton";
import { AuthorResponse } from "../../models/authorModels";
import CenteredContent from "../layout/CenteredContent";
import SearchDialogContainer from "./SearchDialogContainer";
import SearchContentContainer from "./SearchContentContainer";

type SearchDialogProps = {
  onClickResult?: (result: BookResponse | AuthorResponse) => void;
  resourceType?: ResourceType;
  disableSelectResourceType?: boolean;
  title?: string;
} & Pick<DialogProps, "onClose" | "open">;

export default function SearchDialog({
  open,
  onClose,
  onClickResult,
  resourceType,
  disableSelectResourceType,
  title,
}: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounceValue(query);
  const [selectedType, setSelectedType] = useState<ResourceType>("books");
  const { data, isFetching } = useSearch(debouncedQuery, selectedType);

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const renderDialogContent = () => {
    if (isFetching) {
      return (
        <CenteredContent>
          <CircularProgress />
        </CenteredContent>
      );
    }
    if (!data && !isFetching) {
      return (
        <CenteredContent>
          <Typography textAlign="center" variant="h6">
            {isPlLanguage
              ? "Wpisz frazę, aby wyszukać"
              : "Type phrase to search"}
          </Typography>
        </CenteredContent>
      );
    }
    return renderResult(data, selectedType);
  };

  const renderResult = (data: unknown, type: ResourceType) => {
    switch (type) {
      case "books":
        return (data as PaginatedResponse<BookResponse, "books">).books.map(
          (book) => (
            <BookResult key={book.id} book={book} onClick={onClickResult} />
          ),
        );
      default:
        return null;
    }
  };

  return (
    <SearchDialogContainer open={open} onClose={onClose}>
      <DialogTitle>
        {title ??
          (isPlLanguage
            ? "Szukaj książki, autorów, użytkowników i posty"
            : "Search for books, authors, users and posts")}
      </DialogTitle>
      <DialogCloseButton onClose={onClose} />
      <TextField
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={(theme) => ({
          paddingInline: theme.spacing(2),
          marginBottom: theme.spacing(2),
        })}
        placeholder={isPlLanguage ? "Szukaj..." : "Search..."}
        slotProps={{
          input: {
            startAdornment: <SearchIcon sx={{ marginRight: "0.3rem" }} />,
            endAdornment: (
              <SelectResourceType
                resourceType={resourceType ?? selectedType}
                onResourceTypeChange={setSelectedType}
                disabled={disableSelectResourceType}
              />
            ),
          },
        }}
      />
      <SearchContentContainer>{renderDialogContent()}</SearchContentContainer>
    </SearchDialogContainer>
  );
}
