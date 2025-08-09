import ToolbarContainer from "./ToolbarContainer";
import ToolbarSearchTextField from "./ToolbarSearchTextField";
import ToolbarFilterButton, {
  ToolbarFilterButtonProps,
} from "./ToolbarFilterButton";
import { TextFieldProps } from "@mui/material";

type ToolbarProps = {
  filterButtonProps: ToolbarFilterButtonProps;
  searchTextFieldProps?: TextFieldProps;
};

export default function Toolbar({
  filterButtonProps,
  searchTextFieldProps,
}: ToolbarProps) {
  return (
    <ToolbarContainer>
      <ToolbarSearchTextField {...searchTextFieldProps} />
      <ToolbarFilterButton {...filterButtonProps} />
    </ToolbarContainer>
  );
}
