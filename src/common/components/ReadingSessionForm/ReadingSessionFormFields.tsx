import { Grid } from "@mui/material";
import { useUserContext } from "../../auth/UserContext";
import RequiredLabel from "../ui/Label/RequiredLabel";
import ControlledNumberField from "../FormInput/ControlledNumberField";
import ControlledDateTimePicker from "../FormInput/ControlledDateTimePicker";
import ControlledTextField from "../FormInput/ControlledTextField";
import OptionalLabel from "../ui/Label/OptionalLabel";

export default function ReadingSessionFormFields() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const fields = [
    {
      component: ControlledNumberField,
      props: {
        name: "pageRange.from",
        label: (
          <RequiredLabel text={isPlLanguage ? "Strona od" : "Start page"} />
        ),
      },
    },
    {
      component: ControlledNumberField,
      props: {
        name: "pageRange.to",
        label: <RequiredLabel text={isPlLanguage ? "Strona do" : "End page"} />,
      },
    },
    {
      component: ControlledDateTimePicker,
      props: {
        name: "durationRange.startedAt",
        label: (
          <RequiredLabel
            text={
              isPlLanguage ? "Data i czas rozpoczęcia" : "Start date and time"
            }
          />
        ),
      },
    },
    {
      component: ControlledDateTimePicker,
      props: {
        name: "durationRange.finishedAt",
        label: (
          <RequiredLabel
            text={
              isPlLanguage ? "Data i czas zakończenia" : "End date and time"
            }
          />
        ),
      },
    },
    {
      component: ControlledTextField,
      props: {
        name: "Opis",
        label: <OptionalLabel text={isPlLanguage ? "Opis" : "Description"} />,
        multiline: true,
      },
      size: 12,
    },
  ];

  return (
    <Grid container spacing={3}>
      {fields.map(({ size = 6, props, component: FieldComponent }) => (
        <Grid size={size}>
          <FieldComponent {...props} />
        </Grid>
      ))}
    </Grid>
  );
}
