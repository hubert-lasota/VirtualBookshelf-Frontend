import { MenuItem, Select, SelectProps } from "@mui/material";
import { useUserContext } from "../../../features/user/UserContext";
import { AppLanguageCode } from "../../../features/user/models";

type LanguageTagLabeled = {
  value: AppLanguageCode;
  label: string;
};

const langTags: LanguageTagLabeled[] = [
  { value: "pl-PL", label: "PL" },
  { value: "en-US", label: "EN" },
];

export default function LanguageSelect(props: Omit<SelectProps, "value">) {
  const {
    preferences: { languageTag, setLanguageTag },
  } = useUserContext();

  return (
    // @ts-ignore
    <Select<LanguageTagLabeled>
      variant="standard"
      disableUnderline
      value={langTags.find(({ value }) => value === languageTag)}
      renderValue={(langTag) => langTag.label}
      sx={{ fontWeight: 600 }}
      {...props}
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
