import ControlledSelect from "../../../../common/components/Form/Input/ControlledSelect";
import RequiredLabel from "../../../../common/components/Label/RequiredLabel";
import { useUserContext } from "../../../../common/auth/UserContext";
import { ReadingStatus } from "../../../../common/models/readingBookModels";
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
      value: ReadingStatus.WANT_TO_READ,
      label: isPlLanguage ? "Chcę przeczytać" : "Want to read",
    },
    {
      value: ReadingStatus.READING,
      label: isPlLanguage ? "W trakcie czytania" : "Reading",
    },
    {
      value: ReadingStatus.READ,
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
