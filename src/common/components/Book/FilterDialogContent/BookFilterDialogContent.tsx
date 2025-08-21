import { BookFilter } from "../../../models/bookModels";
import { Dispatch, SetStateAction } from "react";
import { useUserContext } from "../../../auth/UserContext";
import GenreFilterSelect from "./GenreFilterSelect";
import { Stack, TextField, Typography } from "@mui/material";
import AuthorFilterSelect from "./AuthorFilterSelect";
import BookFormatFilterSelect from "./BookFormatFilterSelect";

type BookFilterDialogContentProps = {
  filter: BookFilter;
  setFilter: Dispatch<SetStateAction<BookFilter>>;
};

export default function BookFilterDialogContent({
  filter,
  setFilter,
}: BookFilterDialogContentProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const handleFilterChange = (key: keyof BookFilter, value: unknown) => {
    setFilter((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const rangeListItems = [
    {
      label: isPlLanguage ? "Rok publikacji" : "Publication year",
      rangeObject: filter.publicationYearRange,
    },
    {
      label: isPlLanguage ? "Liczba stron" : "Page count",
      rangeObject: filter.pageCountRange,
    },
  ];

  return (
    <Stack spacing={2}>
      <GenreFilterSelect
        genreId={filter.genreId}
        onGenreIdChange={(genreId) => handleFilterChange("genreId", genreId)}
      />
      <AuthorFilterSelect
        authorId={filter.authorId}
        onAuthorIdChange={(authorId) =>
          handleFilterChange("authorId", authorId)
        }
      />
      <BookFormatFilterSelect
        formatId={filter.formatId}
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
                  handleFilterChange("publicationYearRange", {
                    ...filter.publicationYearRange,
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
  );
}
