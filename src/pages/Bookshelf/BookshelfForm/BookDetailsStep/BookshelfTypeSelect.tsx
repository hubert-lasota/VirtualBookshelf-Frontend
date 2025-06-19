import { MenuItem } from "@mui/material";
import { useUserContext } from "../../../../features/user/UserContext";
import { BookshelfType } from "../../../../features/bookshelf/bookshelfModels";
import ControlledSelect from "../../../../common/components/FormInput/ControlledSelect";
import RequiredLabel from "../../../../common/components/Label/RequiredLabel";

export default function BookshelfTypeSelect() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const items = [
    {
      value: BookshelfType.TO_READ,
      label: isPlLanguage ? "Do przeczytania" : "To read",
    },
    {
      value: BookshelfType.READING,
      label: isPlLanguage ? "W trakcie czytania" : "Reading",
    },
    {
      value: BookshelfType.READ,
      label: isPlLanguage ? "Przeczytane" : "Read",
    },
  ];

  return (
    <ControlledSelect
      name="type"
      label={
        <RequiredLabel text={isPlLanguage ? "Typ regału" : "Bookshelf type"} />
      }
    >
      {items.map(({ value, label }) => (
        <MenuItem key={`${value}-${label}`} value={value}>
          {label}
        </MenuItem>
      ))}
    </ControlledSelect>
  );
}
