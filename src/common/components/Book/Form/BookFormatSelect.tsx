import { MenuItem } from "@mui/material";
import { useGetBookFormats } from "../../../api/bookFormatClient";
import ControlledSelect from "../../FormInput/ControlledSelect";
import OptionalLabel from "../../Label/OptionalLabel";

type BookFormatSelectProps = {
  name: string;
  disabled?: boolean;
};

export default function BookFormatSelect({
  name,
  disabled,
}: BookFormatSelectProps) {
  const { data: { formats = [] } = {} } = useGetBookFormats();

  return (
    <ControlledSelect
      name={name}
      // @ts-ignore
      renderValue={(formatId: number) =>
        formats.find(({ id }) => id === formatId)?.name || ""
      }
      label={<OptionalLabel text="Format" />}
      disabled={disabled}
    >
      {formats.map((format) => (
        // @ts-ignore
        <MenuItem key={format.id} value={format.id}>
          {format.name}
        </MenuItem>
      ))}
    </ControlledSelect>
  );
}
