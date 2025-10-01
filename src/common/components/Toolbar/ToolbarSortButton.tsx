import FormDialog, { FormDialogProps } from "../Form/FormDialog";
import React, { ReactNode, useState } from "react";
import { useUserContext } from "../../auth/UserContext";
import { Button } from "@mui/material";
import { ApiSort } from "../../api/apiModels";
import SortIcon from "@mui/icons-material/Sort";
import SortFieldSelect, { SortField } from "./SortFieldSelect";
import SortDirectionRadioGroup from "./SortDirectionRadioGroup";

export type ToolbarSortButtonProps = {
  title?: ReactNode;
  fields: SortField[];
  onSubmit: FormDialogProps<ApiSort>["onSubmit"];
  defaultValues?: FormDialogProps<ApiSort>["defaultValues"];
  resolver?: FormDialogProps<ApiSort>["resolver"];
};

export default function ToolbarSortButton({
  title,
  fields,
  onSubmit,
  defaultValues,
  resolver,
}: ToolbarSortButtonProps) {
  const [open, setOpen] = useState(false);

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const handleSubmit = async (
    sort: ApiSort,
    event: React.BaseSyntheticEvent | undefined,
  ) => {
    await onSubmit(sort, event);
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<SortIcon />}
        onClick={() => setOpen(true)}
        sx={(theme) => ({ backgroundColor: theme.palette.background.paper })}
      >
        {isPlLanguage ? "Sortuj" : "Sort"}
      </Button>
      <FormDialog<ApiSort>
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        defaultValues={defaultValues}
        actionProps={{
          submitButtonProps: { children: isPlLanguage ? "Zastosuj" : "Apply" },
          showResetButton: true,
        }}
        title={title ?? (isPlLanguage ? "Sortuj" : "Sort")}
        resolver={resolver}
        paper={{ sx: { minWidth: "30%" } }}
        dialogContentProps={{
          sx: (theme) => ({ display: "flex", gap: theme.spacing(2) }),
        }}
      >
        <SortFieldSelect fields={fields} />
        <SortDirectionRadioGroup />
      </FormDialog>
    </>
  );
}
