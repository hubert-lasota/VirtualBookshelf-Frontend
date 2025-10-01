import { useGetBookFormats } from "../../../api/clients/bookFormatClient";
import { MenuItem } from "@mui/material";
import ControlledSelect from "../../Form/Input/ControlledSelect";

export default function BookFormatFilterSelect() {
  const { data: { formats = [] } = {} } = useGetBookFormats({
    availableInBookshelf: true,
  });

  return (
    <ControlledSelect
      name="formatId"
      renderValue={(formatId) =>
        formats.find((f) => f.id === formatId)?.name ?? ""
      }
      label="Format"
    >
      {formats.map((f) => (
        <MenuItem key={f.id} value={f.id}>
          {f.name}
        </MenuItem>
      ))}
    </ControlledSelect>
  );
}
