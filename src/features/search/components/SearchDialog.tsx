import { useDebounceValue } from "../../../common/hooks";
import { useState } from "react";
import {
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { ResourceType, useSearch } from "../searchClient";
import { useUserContext } from "../../user/UserContext";
import { Book } from "../../book/models";
import BookResult from "./BookResult";
import { PaginatedResponse } from "../../../common/api/models";
import SelectResourceType from "./SelectResourceType";
import SearchIcon from "@mui/icons-material/Search";
import { withCenteredContent } from "../../../common/components/styles";
import DialogCloseButton from "../../../common/DialogCloseButton";

type SearchDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SearchDialog({ isOpen, onClose }: SearchDialogProps) {
  const [query, setQuery] = useState<string>("");
  const debouncedQuery = useDebounceValue(query);
  const [selectedType, setSelectedType] = useState<ResourceType>("books");
  const { data, isFetching } = useSearch(debouncedQuery, selectedType);

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const renderDialogContent = () => {
    if (isFetching) {
      return withCenteredContent(<CircularProgress />);
    }
    if (!data && !isFetching) {
      return withCenteredContent(
        <Typography textAlign="center" variant="h6">
          {isPlLanguage ? "Wpisz frazę, aby wyszukać" : "Type phrase to search"}
        </Typography>,
      );
    }
    return renderResult(data, selectedType);
  };

  const renderResult = (data: unknown, type: ResourceType) => {
    switch (type) {
      case "books":
        return (data as PaginatedResponse<Book, "books">).books.map((book) => (
          <BookResult book={book} />
        ));
      default:
        return null;
    }
  };

  return (
    <Dialog
      open={isOpen}
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
        {isPlLanguage
          ? "Szukaj książki, autorów, użytkowników i posty"
          : "Search for books, authors, users and posts"}
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
                resourceType={selectedType}
                onResourceTypeChange={setSelectedType}
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
