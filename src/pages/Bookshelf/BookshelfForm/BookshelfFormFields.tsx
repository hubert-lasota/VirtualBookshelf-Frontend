import { Divider, Grid } from "@mui/material";
import ControlledTextField from "../../../common/components/FormInput/ControlledTextField";
import RequiredLabel from "../../../common/components/ui/Label/RequiredLabel";
import BookshelfTypeSelect from "./BookshelfTypeSelect";
import OptionalLabel from "../../../common/components/ui/Label/OptionalLabel";
import { useUserContext } from "../../../common/auth/UserContext";

export default function BookshelfFormFields() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

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
    <>
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
    </>
  );
}
