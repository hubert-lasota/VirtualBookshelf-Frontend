import RequiredLabel from "../../../../common/components/Label/RequiredLabel";
import BookshelfTypeSelect from "./BookshelfTypeSelect";
import OptionalLabel from "../../../../common/components/Label/OptionalLabel";
import { useUserContext } from "../../../../features/user/UserContext";
import { Grid, Stack } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import {
  BookshelfDetailsFormValues,
  createBookshelfDetailsSchema,
} from "../../../../features/bookshelf/bookshelfModels";
import { zodResolver } from "@hookform/resolvers/zod";
import ControlledTextField from "../../../../common/components/FormInput/ControlledTextField";
import FormActionButtons from "../FormActionButtons";
import React from "react";
import { useBookshelfPageContext } from "../../BookshelfPageContext";

type BookshelfDetailsStepProps = {
  nextStep: () => void;
  setBookshelfDetails: React.Dispatch<
    React.SetStateAction<BookshelfDetailsFormValues | undefined>
  >;
};

export default function BookshelfDetailsStep({
  nextStep,
  setBookshelfDetails,
}: BookshelfDetailsStepProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { currentBookshelf } = useBookshelfPageContext();

  const schema = createBookshelfDetailsSchema(isPlLanguage);
  const form = useForm<BookshelfDetailsFormValues>({
    mode: "all",
    ...(currentBookshelf ? { defaultValues: currentBookshelf } : {}),
    resolver: zodResolver(schema),
  });

  const onSubmit = (bookshelfDetails: BookshelfDetailsFormValues) => {
    setBookshelfDetails(bookshelfDetails);
    nextStep();
  };

  const { setIsBookshelfFormOpen } = useBookshelfPageContext();

  const fields = [
    {
      name: "name",
      label: <RequiredLabel text={isPlLanguage ? "Nazwa" : "Name"} />,
    },
    {
      component: <BookshelfTypeSelect />,
    },
    {
      name: "description",
      label: <OptionalLabel text={isPlLanguage ? "Opis" : "Description"} />,
      multiline: true,
    },
  ];

  return (
    <FormProvider {...form}>
      <Stack
        component="form"
        onSubmit={form.handleSubmit(onSubmit)}
        spacing={2}
      >
        <Grid container spacing={2}>
          {fields.map(({ component, name, ...rest }, index) => (
            <Grid
              key={`bookshelf-details-step-${index}`}
              size={name === "description" ? 12 : 6}
            >
              {component ? (
                component
              ) : (
                <ControlledTextField name={name} {...rest} />
              )}
            </Grid>
          ))}
        </Grid>
        <FormActionButtons
          cancelBtnProps={{
            children: isPlLanguage ? "Anuluj" : "Cancel",
            onClick: () => setIsBookshelfFormOpen(false),
          }}
          submitBtnProps={{
            type: "submit",
            children: isPlLanguage ? "Dalej" : "Next",
          }}
        />
      </Stack>
    </FormProvider>
  );
}
