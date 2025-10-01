import { MenuItem, Select } from "@mui/material";
import { useUserContext } from "../../common/auth/UserContext";
import { useSearchPageContext } from "./SearchPageContext";

export default function ResourceSelect() {
  const { resourceType, onResourceTypeChange } = useSearchPageContext();

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
  );
}
