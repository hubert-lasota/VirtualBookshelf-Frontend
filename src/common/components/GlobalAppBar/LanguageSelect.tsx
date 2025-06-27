import { MenuItem, Select, SelectProps } from "@mui/material";
import { useUserContext } from "../../auth/UserContext";
import { AppLanguageCode } from "../../models/userModels";

type LangCodeWithLabel = {
  value: AppLanguageCode;
  label: string;
};

const languages: LangCodeWithLabel[] = [
  { value: "pl", label: "PL" },
  { value: "en", label: "EN" },
];

export default function LanguageSelect(props: Omit<SelectProps, "value">) {
  const {
    preferences: { languageCode, setLanguageCode },
  } = useUserContext();

  return (
    // @ts-ignore
    <Select<LangCodeWithLabel>
      variant="standard"
      disableUnderline
      value={languages.find(({ value }) => value === languageCode)}
      renderValue={(langTag) => langTag.label}
      sx={{ fontWeight: 600 }}
      {...props}
    >
      {languages.map((langTag) => (
        //@ts-ignore
        <MenuItem
          key={`${langTag.value}${langTag.label}`}
          sx={{ paddingInline: "2rem" }}
          value={langTag}
          onClick={() => setLanguageCode(langTag.value)}
        >
          {langTag.label}
        </MenuItem>
      ))}
    </Select>
  );
}
