import ToolbarContainer from "./ToolbarContainer";
import ToolbarSearchTextField from "./ToolbarSearchTextField";
import ToolbarFilterButton, {
  ToolbarFilterButtonProps,
} from "./ToolbarFilterButton";
import { TextFieldProps } from "@mui/material";
import React from "react";

type ToolbarProps = {
  filterButtonProps: ToolbarFilterButtonProps;
  searchTextFieldProps?: TextFieldProps;
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
