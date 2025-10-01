import { Grid } from "@mui/material";
import ControlledTextField from "../../../../common/components/Form/Input/ControlledTextField";
import RequiredLabel from "../../../../common/components/Label/RequiredLabel";
import BookshelfTypeSelect from "./BookshelfTypeSelect";
import OptionalLabel from "../../../../common/components/Label/OptionalLabel";
import { useUserContext } from "../../../../common/auth/UserContext";

export default function BookshelfFormFields() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const fields = [
    <ControlledTextField
      name="name"
      label={<RequiredLabel text={isPlLanguage ? "Nazwa" : "Name"} />}
    />,
    <BookshelfTypeSelect />,
    <ControlledTextField
      name="description"
      label={<OptionalLabel text={isPlLanguage ? "Opis" : "Description"} />}
      multiline
    />,
  ];

  return (
    <Grid container spacing={2}>
      {fields.map((component, index) => (
        <Grid size={index === fields.length - 1 ? 12 : 6}>{component}</Grid>
      ))}
    </Grid>
  );
}
