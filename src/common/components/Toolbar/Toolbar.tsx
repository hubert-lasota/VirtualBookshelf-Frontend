import ToolbarContainer from "./ToolbarContainer";
import ToolbarSearchTextField, {
  ToolbarSearchTextFieldProps,
} from "./ToolbarSearchTextField";
import ToolbarFilterButton, {
  ToolbarFilterButtonProps,
} from "./ToolbarFilterButton";
import React from "react";
import { FieldValues } from "react-hook-form";
import ToolbarSortButton, { ToolbarSortButtonProps } from "./ToolbarSortButton";

type ToolbarProps<FilterValues extends FieldValues> = {
  filterButtonProps: ToolbarFilterButtonProps<FilterValues>;
  sortButtonProps: ToolbarSortButtonProps;
  searchTextFieldProps?: ToolbarSearchTextFieldProps;
  children?: React.ReactNode;
};

export default function Toolbar<FilterValues extends FieldValues>({
  filterButtonProps,
  searchTextFieldProps,
  sortButtonProps,
  children,
}: ToolbarProps<FilterValues>) {
  return (
    <ToolbarContainer>
      <ToolbarSearchTextField {...searchTextFieldProps} />
      <ToolbarFilterButton<FilterValues> {...filterButtonProps} />
      <ToolbarSortButton {...sortButtonProps} />
      {children}
    </ToolbarContainer>
  );
}
