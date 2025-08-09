import { useGetBookFormats } from "../../../common/api/clients/bookFormatClient";
import { FormControl, MenuItem, Select, Typography } from "@mui/material";

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
    <FormControl>
      <Typography>Format</Typography>
      <Select
        variant="outlined"
        value={formatId ?? ""}
        renderValue={(formatId) =>
          formats.find((f) => f.id === formatId)?.name ?? ""
        }
        onChange={(e) => onFormatIdChange(e.target.value)}
      >
        {formats.map((f) => (
          <MenuItem key={f.id} value={f.id}>
            {f.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
