import { ResourceType } from "../../api/clients/searchClient";
import { FormControl, MenuItem, Select } from "@mui/material";
import { useUserContext } from "../../auth/UserContext";

type SelectResourceTypeProps = {
  resourceType: ResourceType;
  onResourceTypeChange: (resourceType: ResourceType) => void;
  disabled?: boolean;
};

const resourceTypes = ["books", "authors", "users", "posts"] as const;

const getRenderValue = (resourceType: ResourceType, isPlLang: boolean) => {
  const renderValues = {
    books: isPlLang ? "Książki" : "Books",
    authors: isPlLang ? "Autorzy" : "Authors",
    users: isPlLang ? "Użytkownicy" : "Users",
    posts: isPlLang ? "Posty" : "Posts",
  };
  return renderValues[resourceType];
};

export default function SelectResourceType({
  resourceType,
  onResourceTypeChange,
  disabled,
}: SelectResourceTypeProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <FormControl
      disabled={disabled}
      sx={{
        borderLeft: "2px solid",
        borderColor: "divider",
        height: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Select
        variant="standard"
        value={resourceType}
        renderValue={() => getRenderValue(resourceType, isPlLanguage)}
        disableUnderline
        sx={{ pl: 1, ml: 1 }}
      >
        {resourceTypes.map((type) => (
          <MenuItem onClick={() => onResourceTypeChange(type)}>
            {getRenderValue(type, isPlLanguage)}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
