import { useGetBookFormats } from "../../../api/clients/bookFormatClient";
import { MenuItem } from "@mui/material";
import SimpleSelect from "../../Input/SimpleSelect";

type BookFormatSelectProps = {
  formatId?: number;
  onFormatIdChange: (formatId: number) => void;
};

export default function BookFormatFilterSelect({
  formatId,
  onFormatIdChange,
}: BookFormatSelectProps) {
  const { data: { formats = [] } = {} } = useGetBookFormats({
    availableInBookshelf: true,
  });

  return (
    <SimpleSelect
      value={formatId}
      renderValue={(formatId) =>
        formats.find((f) => f.id === formatId)?.name ?? ""
      }
      onChange={(e) => onFormatIdChange(Number(e.target.value))}
      label="Format"
    >
      {formats.map((f) => (
        <MenuItem key={f.id} value={f.id}>
          {f.name}
        </MenuItem>
      ))}
    </SimpleSelect>
  );
}
