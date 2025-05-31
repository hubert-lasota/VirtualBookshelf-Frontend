import { MenuItem, Select } from "@mui/material";
import { useUserContext } from "../../../features/user/UserContext";
import { LanguageTag } from "../../../features/user/types";

type LanguageTagLabeled = {
  value: LanguageTag;
  label: string;
};

const langTags: LanguageTagLabeled[] = [
  { value: "pl-PL", label: "PL" },
  { value: "en-US", label: "EN" },
];

export default function LanguageSelect() {
  const {
    preferences: { languageTag, setLanguageTag },
  } = useUserContext();

  return (
    <Select
      variant="standard"
      disableUnderline
      value={langTags.find(({ value }) => value === languageTag)}
      renderValue={(langTag) => langTag.label}
      sx={{ fontWeight: 600 }}
    >
      {langTags.map((langTag) => (
        //@ts-ignore
        <MenuItem
          key={`${langTag.value}${langTag.label}`}
          sx={{ paddingInline: "2rem" }}
          value={langTag}
          onClick={() => setLanguageTag(langTag.value)}
        >
          {langTag.label}
        </MenuItem>
      ))}
    </Select>
  );
}
