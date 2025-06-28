import ControlledSelect from "../../common/components/FormInput/ControlledSelect";
import RequiredLabel from "../../common/components/ui/Label/RequiredLabel";
import { useUserContext } from "../../common/auth/UserContext";
import { BookReadingStatus } from "../../common/models/bookshelfBookModels";
import { MenuItem } from "@mui/material";

export default function BookReadingStatusSelect({
  namePrefix,
}: {
  namePrefix: string;
}) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();
  const items = [
    {
      value: BookReadingStatus.READING,
      label: isPlLanguage ? "W trakcie czytania" : "Reading",
    },
    {
      value: BookReadingStatus.READ,
      label: isPlLanguage ? "Zakończono czytanie" : "Ended",
    },
  ];
  return (
    <ControlledSelect
      name={namePrefix + "status"}
      label={
        <RequiredLabel
          text={isPlLanguage ? "Status czytania" : "Reading status"}
        />
      }
      renderValue={(val) =>
        items.find((item) => item.value === val)?.label || ""
      }
    >
      {items.map(({ value, label }) => (
        <MenuItem value={value} key={value}>
          {label}
        </MenuItem>
      ))}
    </ControlledSelect>
  );
}
