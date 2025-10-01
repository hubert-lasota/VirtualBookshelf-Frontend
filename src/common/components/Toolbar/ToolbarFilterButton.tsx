import { Button } from "@mui/material";
import { useUserContext } from "../../auth/UserContext";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import React, { ReactNode, useState } from "react";
import FormDialog, { FormDialogProps } from "../Form/FormDialog";
import { FieldValues } from "react-hook-form";

export type ToolbarFilterButtonProps<FilterValues extends FieldValues> = {
  title?: ReactNode;
  content: ReactNode;
  onSubmit: FormDialogProps<FilterValues>["onSubmit"];
  defaultValues?: FormDialogProps<FilterValues>["defaultValues"];
  resolver?: FormDialogProps<FilterValues>["resolver"];
};

export default function ToolbarFilterButton<FilterValues extends FieldValues>({
  title,
  content,
  onSubmit,
  defaultValues,
  resolver,
}: ToolbarFilterButtonProps<FilterValues>) {
  const [open, setOpen] = useState(false);

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const handleSubmit = async (
    formValues: FilterValues,
    event: React.BaseSyntheticEvent | undefined,
  ) => {
    await onSubmit(formValues, event);
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<FilterAltIcon />}
        onClick={() => setOpen(true)}
        sx={(theme) => ({ backgroundColor: theme.palette.background.paper })}
      >
        {isPlLanguage ? "Filtry" : "Filters"}
      </Button>
      <FormDialog<FilterValues>
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
        actionProps={{
          submitButtonProps: { children: isPlLanguage ? "Zastosuj" : "Apply" },
          showResetButton: true,
        }}
        title={title ?? (isPlLanguage ? "Filtry" : "Filters")}
        resolver={resolver}
        paper={{ sx: { minWidth: "55%" } }}
      >
        {content}
      </FormDialog>
    </>
  );
}
