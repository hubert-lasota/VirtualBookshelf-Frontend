import { useDebounceValue } from "../../../common/hooks";
import { useState } from "react";
import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { ResourceType, useSearch } from "../searchClient";
import { useUserContext } from "../../user/UserContext";
import { BookResponse } from "../../book/bookModels";
import BookResult from "./BookResult";
import { PaginatedResponse } from "../../../common/api/models";
import SelectResourceType from "./SelectResourceType";
import SearchIcon from "@mui/icons-material/Search";
import DialogCloseButton from "../../../common/components/Dialog/DialogCloseButton";
import { AuthorResponse } from "../../author/authorModels";
import CenteredContent from "../../../common/components/CenteredContent";

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
  const [query, setQuery] = useState<string>("");
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
          (book) => <BookResult book={book} onClick={onClickResult} />,
        );
      default:
        return null;
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={(theme) => ({
        "& .MuiDialogContent-root": {
          padding: theme.spacing(2),
        },
        "& .MuiPaper-root": {
          width: "60%",
          minHeight: "40%",
        },
      })}
    >
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
      <Divider sx={(theme) => ({ paddingTop: theme.spacing(2) })} />
      <DialogContent sx={{ display: "flex", flex: 1 }}>
        {renderDialogContent()}
      </DialogContent>
    </Dialog>
  );
}
