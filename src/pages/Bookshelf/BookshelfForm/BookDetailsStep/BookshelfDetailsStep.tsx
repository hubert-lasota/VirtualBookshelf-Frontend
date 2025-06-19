import RequiredLabel from "../../../../common/components/Label/RequiredLabel";
import BookshelfTypeSelect from "./BookshelfTypeSelect";
import OptionalLabel from "../../../../common/components/Label/OptionalLabel";
import { useUserContext } from "../../../../features/user/UserContext";
import { Grid, Stack } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import {
  BookshelfDetails,
  BookshelfResponse,
  createBookshelfDetailsSchema,
} from "../../../../features/bookshelf/bookshelfModels";
import { zodResolver } from "@hookform/resolvers/zod";
import ControlledTextField from "../../../../common/components/FormInput/ControlledTextField";
import FormActionButtons from "../FormActionButtons";
import React from "react";

type BookshelfDetailsStepProps = {
  bookshelf?: BookshelfResponse;
  nextStep: () => void;
  onClose: () => void;
  setBookshelfDetails: React.Dispatch<
    React.SetStateAction<BookshelfDetails | undefined>
  >;
};

export default function BookshelfDetailsStep({
  bookshelf,
  onClose,
  nextStep,
  setBookshelfDetails,
}: BookshelfDetailsStepProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const schema = createBookshelfDetailsSchema(isPlLanguage);
  const form = useForm<BookshelfDetails>({
    mode: "all",
    ...(bookshelf ? { defaultValues: bookshelf } : {}),
    resolver: zodResolver(schema),
  });

  const onSubmit = (bookshelfDetails: BookshelfDetails) => {
    setBookshelfDetails(bookshelfDetails);
    nextStep();
  };

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
            onClick: onClose,
            children: isPlLanguage ? "Anuluj" : "Cancel",
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
