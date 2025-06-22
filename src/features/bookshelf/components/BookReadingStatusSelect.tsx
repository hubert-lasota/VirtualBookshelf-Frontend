import ControlledSelect from "../../../common/components/FormInput/ControlledSelect";
import RequiredLabel from "../../../common/components/Label/RequiredLabel";
import { useUserContext } from "../../user/UserContext";
import { BookReadingStatus } from "../bookshelfBookModels";
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
      value: BookReadingStatus.ENDED,
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
