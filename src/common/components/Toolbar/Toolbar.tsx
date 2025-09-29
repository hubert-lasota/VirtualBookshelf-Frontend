import ToolbarContainer from "./ToolbarContainer";
import ToolbarSearchTextField, {
  ToolbarSearchTextFieldProps,
} from "./ToolbarSearchTextField";
import ToolbarFilterButton, {
  ToolbarFilterButtonProps,
} from "./ToolbarFilterButton";
import React from "react";

type ToolbarProps = {
  filterButtonProps: ToolbarFilterButtonProps;
  searchTextFieldProps?: ToolbarSearchTextFieldProps;
  children?: React.ReactNode;
};

export default function Toolbar({
  filterButtonProps,
  searchTextFieldProps,
  children,
}: ToolbarProps) {
  return (
    <ToolbarContainer>
      <ToolbarSearchTextField {...searchTextFieldProps} />
      <ToolbarFilterButton {...filterButtonProps} />
      {children}
    </ToolbarContainer>
  );
}
