import Toolbar from "../../../common/components/ui/Toolbar/Toolbar";
import { useBookshelfViewContext } from "../BookshelfViewContext";
import { useEffect, useState } from "react";
import { Stack, TextField, Typography } from "@mui/material";
import { ReadingBookFilters } from "../models";
import { useUserContext } from "../../../common/auth/UserContext";
import BookFormatFilterSelect from "./BookFormatFilterSelect";
import AuthorFilterSelect from "./AuthorFilterSelect";
import GenreFilterSelect from "./GenreFilterSelect";

const initFilters: ReadingBookFilters = {
  pageCount: {
    gte: undefined,
    lte: undefined,
  },
  publicationYear: {
    gte: undefined,
    lte: undefined,
  },
};

export default function BookshelfToolbar() {
  const { query, onQueryChange, filters, onFiltersChange } =
    useBookshelfViewContext();

  const [unsavedFilters, setUnsavedFilters] =
    useState<ReadingBookFilters>(initFilters);

  useEffect(() => {
    setUnsavedFilters(filters);
  }, [filters]);

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const handleFilterChange = (key: string, value: unknown) => {
    setUnsavedFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const rangeListItems = [
    {
      label: isPlLanguage ? "Rok publikacji" : "Publication year",
      rangeObject: unsavedFilters.publicationYear,
    },
    {
      label: isPlLanguage ? "Liczba stron" : "Page count",
      rangeObject: unsavedFilters.pageCount,
    },
  ];
  console.log(unsavedFilters);
  return (
    <Toolbar
      searchTextFieldProps={{
        value: query,
        onChange: (e) => onQueryChange(e.target.value),
      }}
      filterButtonProps={{
        onApply: () => onFiltersChange(unsavedFilters),
        onReset: () => {
          onFiltersChange(initFilters);
          setUnsavedFilters(initFilters);
        },
        content: (
          <Stack spacing={2}>
            <GenreFilterSelect
              genreId={unsavedFilters.genreId}
              onGenreIdChange={(genreId) =>
                handleFilterChange("genreId", genreId)
              }
            />
            <AuthorFilterSelect
              authorId={unsavedFilters.authorId}
              onAuthorIdChange={(authorId) =>
                handleFilterChange("authorId", authorId)
              }
            />
            <BookFormatFilterSelect
              formatId={unsavedFilters.formatId}
              onFormatIdChange={(formatId) =>
                handleFilterChange("formatId", formatId)
              }
            />
            {rangeListItems.map(({ label, rangeObject }) => (
              <Stack component="li" sx={{ width: "100%" }}>
                <Typography gutterBottom>{label}</Typography>
                <Stack direction="row" spacing={2} sx={{ width: "100%" }}>
                  {Object.keys(rangeObject).map((key) => (
                    <TextField
                      fullWidth
                      key={key}
                      type="number"
                      // @ts-ignore
                      value={rangeObject[key] ?? ""}
                      onChange={(e) =>
                        handleFilterChange("publicationYear", {
                          ...unsavedFilters.publicationYear,
                          [key]: e.target.value,
                        })
                      }
                      label={
                        key === "lte"
                          ? isPlLanguage
                            ? "Do"
                            : "To"
                          : isPlLanguage
                            ? "Od"
                            : "From"
                      }
                    />
                  ))}
                </Stack>
              </Stack>
            ))}
          </Stack>
        ),
      }}
    />
  );
}
