import { MenuItem } from "@mui/material";
import { useGetBookFormats } from "../bookFormatClient";
import ControlledSelect from "../../../common/components/FormInput/ControlledSelect";
import OptionalLabel from "../../../common/components/Label/OptionalLabel";

type BookFormatSelectProps = {
  name: string;
};

export default function BookFormatSelect({ name }: BookFormatSelectProps) {
  const { data: { formats = [] } = {} } = useGetBookFormats();

  return (
    <ControlledSelect
      name={name}
      // @ts-ignore
      renderValue={(formatId: number) =>
        formats.find(({ id }) => id === formatId)?.name || ""
      }
      label={<OptionalLabel text="Format" />}
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
