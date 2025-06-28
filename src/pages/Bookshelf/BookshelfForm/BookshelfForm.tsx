import {
  BookshelfFormValues,
  createBookshelfSchema,
} from "../../../common/models/bookshelfModels";
import { Box, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import { useUserContext } from "../../../common/auth/UserContext";
import { useBookshelfPageContext } from "../BookshelfPageContext";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RequiredLabel from "../../../common/components/ui/Label/RequiredLabel";
import BookshelfTypeSelect from "./BookshelfTypeSelect";
import OptionalLabel from "../../../common/components/ui/Label/OptionalLabel";
import ControlledTextField from "../../../common/components/FormInput/ControlledTextField";
import CancelButton from "../../../common/components/ui/Button/CancelButton";
import {
  useCreateBookshelf,
  useUpdateBookshelf,
} from "../../../common/api/bookshelfClient";
import SaveButton from "../../../common/components/ui/Button/SaveButton";

export default function BookshelfForm() {
  const { currentBookshelf } = useBookshelfPageContext();

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const isEditing = !!currentBookshelf;

  const { mutate: updateBookshelf } = useUpdateBookshelf();
  const { mutate: createBookshelf } = useCreateBookshelf();

  const schema = createBookshelfSchema(isPlLanguage);
  const form = useForm<BookshelfFormValues>({
    mode: "all",
    ...(currentBookshelf ? { defaultValues: currentBookshelf } : {}),
    resolver: zodResolver(schema),
  });

  const onSubmit = (bookshelf: BookshelfFormValues) => {
    isEditing
      ? updateBookshelf({ bookshelf, bookshelfId: currentBookshelf.id })
      : createBookshelf(bookshelf);
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
      <Box
        component="form"
        onSubmit={form.handleSubmit(onSubmit)}
        sx={(theme) => ({
          padding: theme.spacing(4),
          paddingLeft: theme.spacing(6),
          width: "100%",
          overflowY: "auto",
        })}
      >
        <Paper
          variant="outlined"
          component={Stack}
          spacing={2}
          sx={(theme) => ({ padding: theme.spacing(3) })}
        >
          <Typography variant="h5" gutterBottom>
            {isPlLanguage
              ? isEditing
                ? `Edytuj regał: ${currentBookshelf!.name}`
                : "Dodaj nowy regał"
              : isEditing
                ? `Edit bookshelf: ${currentBookshelf!.name}`
                : "Add new bookshelf"}
          </Typography>
          <Divider />
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
          <Divider />
          <Box>
            <Stack
              direction="row"
              gap={1.5}
              sx={{ width: "100%", justifyContent: "flex-end" }}
            >
              <CancelButton />
              <SaveButton />
            </Stack>
          </Box>
        </Paper>
      </Box>
    </FormProvider>
  );
}
