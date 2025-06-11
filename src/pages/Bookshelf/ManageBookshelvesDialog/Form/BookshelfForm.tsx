import {
  Bookshelf,
  createBookshelfSchema,
} from "../../../../features/bookshelf/models";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Grid, Stack, TextField } from "@mui/material";
import { useUserContext } from "../../../../features/user/UserContext";
import BookshelfTypeSelect from "./BookshelfTypeSelect";
import BookshelfFormSubmit from "./BookshelfFormSubmit";
import BookshelfFormAddBooks from "./BookshelfFormAddBooks";
import LabelRequired from "../../../../common/components/Label/LabelRequired";
import LabelOptional from "../../../../common/components/Label/LabelOptional";
import BookshelfFormHeader from "./BookshelfFormHeader";
import { useState } from "react";

const getFields = (isPlLanguage: boolean) => [
  {
    name: "name",
    label: <LabelRequired text={isPlLanguage ? "Nazwa" : "Name"} />,
    required: false,
  },
  {
    name: "type",
    label: (
      <LabelRequired text={isPlLanguage ? "Typ regału" : "Bookshelf type"} />
    ),
    required: false,
    component: BookshelfTypeSelect,
  },
  {
    name: "description",
    label: <LabelOptional text={isPlLanguage ? "Opis" : "Description"} />,
    multiline: true,
  },
];

type BookshelfFormProps = {
  bookshelf: Bookshelf | null;
};

export default function BookshelfForm({ bookshelf }: BookshelfFormProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();
  const schema = createBookshelfSchema(isPlLanguage);
  const form = useForm<Bookshelf>({
    mode: "all",
    ...(bookshelf ? { defaultValues: bookshelf } : {}),
    resolver: zodResolver(schema),
  });

  const [step, setStep] = useState(0);

  console.log("watch", form.watch());
  const onSubmit = (bookshelfFormData) => {
    if (step === 0) {
      setStep((prev) => prev + 1);
      return;
    }
  };
  const isEditing = !!bookshelf;

  // @ts-ignore
  return (
    <FormProvider {...form}>
      <Stack
        component="form"
        onSubmit={form.handleSubmit(onSubmit)}
        spacing={4}
      >
        <BookshelfFormHeader
          isEditing={isEditing}
          bookshelf={bookshelf}
          step={step}
        />
        {step === 0 && (
          <Grid container spacing={2}>
            {getFields(isPlLanguage).map(({ name, component, ...props }) => {
              const FieldComponent = component || TextField;
              return (
                <Grid
                  size={name === "description" ? 12 : 6}
                  key={`${name}${step}`}
                >
                  <Controller
                    render={({ field, fieldState }) => {
                      console.log("field", field);

                      return (
                        <FieldComponent
                          {...field}
                          value={field.value ?? ""}
                          error={fieldState.invalid}
                          helperText={fieldState.error?.message || ""}
                          fullWidth
                          {...props}
                        />
                      );
                    }}
                    // @ts-ignore
                    name={name}
                  />
                </Grid>
              );
            })}
          </Grid>
        )}

        {step === 1 && <BookshelfFormAddBooks />}

        <BookshelfFormSubmit
          bookshelf={bookshelf}
          step={step}
          onStepChange={setStep}
        />
      </Stack>
    </FormProvider>
  );
}
