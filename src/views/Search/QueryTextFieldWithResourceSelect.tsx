import { InputAdornment, MenuItem, Select, TextField } from "@mui/material";
import { useUserContext } from "../../common/auth/UserContext";
import SearchIcon from "@mui/icons-material/Search";
import { ResourceType } from "./models";

type QueryTextFieldWithResourceSelect = {
  query: string;
  onQueryChange: (query: string) => void;
  resourceType: ResourceType;
  onResourceTypeChange: (resourceType: ResourceType) => void;
};

export default function QueryTextFieldWithResourceSelect({
  query,
  onQueryChange,
  resourceType,
  onResourceTypeChange,
}: QueryTextFieldWithResourceSelect) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const resources = [
    {
      value: "book",
      label: isPlLanguage ? "Książki" : "Books",
    },
    { value: "author", label: isPlLanguage ? "Autorzy" : "Authors" },
    { value: "user", label: isPlLanguage ? "Użytkownicy" : "Users" },
  ];

  return (
    <TextField
      value={query}
      onChange={(e) => onQueryChange(e.target.value)}
      slotProps={{
        input: {
          sx: (theme) => ({
            borderRadius: theme.shape.borderRadius,
          }),
          endAdornment: (
            <InputAdornment position="end">
              <Select
                slotProps={{
                  input: {
                    sx: (theme) => ({
                      paddingLeft: theme.spacing(1.5),
                      borderLeft: `1px solid ${theme.palette.divider}`,
                    }),
                  },
                }}
                disableUnderline
                variant="standard"
                value={resourceType}
                onChange={(e) => onResourceTypeChange(e.target.value)}
                renderValue={(val) =>
                  resources.find(({ value }) => value === val)?.label || ""
                }
              >
                {resources.map(({ value, label }) => (
                  <MenuItem value={value}>{label}</MenuItem>
                ))}
              </Select>
            </InputAdornment>
          ),
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        },
      }}
      placeholder={isPlLanguage ? "Szukaj" : "Search"}
      sx={(theme) => ({
        backgroundColor: theme.palette.background.paper,
        borderRadius: theme.shape.borderRadius,
      })}
    />
  );
}
