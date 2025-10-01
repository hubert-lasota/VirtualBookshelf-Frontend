import { DialogContext } from "../../context/DialogContext";
import {
  Dialog,
  DialogContent,
  DialogContentProps,
  DialogOwnerState,
  DialogPaperSlotPropsOverrides,
  PaperProps,
  SlotProps,
} from "@mui/material";
import {
  DefaultValues,
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
  UseFormProps,
} from "react-hook-form";
import { Mode } from "react-hook-form/dist/types/form";
import { FORM_VALIDATE_MODE } from "../../config/form";
import React from "react";
import FormDialogActions, { FormDialogActionsProps } from "./FormDialogActions";
import CommonDialogTitle from "../Dialog/CommonDialogTitle";

export type FormDialogProps<TFormValues extends FieldValues> = {
  open: boolean;
  onClose: () => void;
  onSubmit: SubmitHandler<TFormValues>;
  children: React.ReactNode;
  resolver?: UseFormProps<TFormValues>["resolver"];
  title?: React.ReactNode;
  showActions?: boolean;
  actionProps?: FormDialogActionsProps;
  dialogContentProps?: DialogContentProps;
  defaultValues?: DefaultValues<TFormValues>;
  mode?: Mode;
  paper?:
    | SlotProps<
        React.ElementType<PaperProps, keyof React.JSX.IntrinsicElements>,
        DialogPaperSlotPropsOverrides,
        DialogOwnerState
      >
    | undefined;
};

export default function FormDialog<TFormValues extends FieldValues>({
  open,
  onClose,
  onSubmit,
  defaultValues,
  resolver,
  mode = FORM_VALIDATE_MODE,
  children,
  paper,
  title,
  showActions = true,
  dialogContentProps,
  actionProps,
}: FormDialogProps<TFormValues>) {
  const form = useForm<TFormValues>({
    mode,
    defaultValues,
    resolver,
  });

  return (
    <DialogContext.Provider value={{ onClose }}>
      <FormProvider {...form}>
        <Dialog
          open={open}
          onClose={onClose}
          slotProps={{
            paper: {
              component: "form",
              onSubmit: form.handleSubmit(onSubmit),
              ...paper,
            },
          }}
        >
          {title ? <CommonDialogTitle title={title} /> : null}
          <DialogContent {...dialogContentProps}>{children}</DialogContent>
          {showActions ? <FormDialogActions {...actionProps} /> : null}
        </Dialog>
      </FormProvider>
    </DialogContext.Provider>
  );
}
