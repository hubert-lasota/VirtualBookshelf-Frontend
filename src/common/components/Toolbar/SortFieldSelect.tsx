import { MenuItem } from "@mui/material";
import ControlledSelect from "../Form/Input/ControlledSelect";
import { useUserContext } from "../../auth/UserContext";

export type SortField = {
  value: string;
  label: string;
};

type Props = {
  fields: SortField[];
};

export default function SortFieldSelect({ fields }: Props) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <ControlledSelect
      name="field"
      label={isPlLanguage ? "Sortuj po" : "Sort by"}
    >
      {fields.map(({ value, label }) => (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      ))}
    </ControlledSelect>
  );
}
