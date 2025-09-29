import { Grid } from "@mui/material";
import GenreSelect from "./GenreSelect";
import { useUserContext } from "../../../common/auth/UserContext";
import RequiredLabel from "../../../common/components/Label/RequiredLabel";
import ControlledTextField from "../../../common/components/FormInput/ControlledTextField";
import { useWatch } from "react-hook-form";
import ControlledChallengeTypeSelect from "./ControlledChallengeTypeSelect";
import { ChallengeType } from "../../../common/models/challengeModels";
import ControlledNumberField from "../../../common/components/FormInput/ControlledNumberField";
import ControlledDatePicker from "../../../common/components/FormInput/ControlledDatePicker";

export default function ChallengeFormFields() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const type: ChallengeType = useWatch({ name: "type" });

  const fields = [
    {
      props: {
        name: "title",
        label: <RequiredLabel text={isPlLanguage ? "Tytuł" : "Title"} />,
      },
    },
    {
      component: ControlledNumberField,
      props: {
        name: "goalValue",
        label: <RequiredLabel text={isPlLanguage ? "Cel" : "Goal"} />,
      },
    },
    {
      component: ControlledChallengeTypeSelect,
    },
    {
      skip: type !== ChallengeType.GENRE_BOOKS,
      component: GenreSelect,
    },
    {
      component: ControlledDatePicker,
      props: {
        name: "durationRange.startAt",
        label: (
          <RequiredLabel
            text={isPlLanguage ? "Data rozpoczęcia" : "Start date"}
          />
        ),
      },
    },
    {
      component: ControlledDatePicker,
      props: {
        name: "durationRange.endAt",
        label: (
          <RequiredLabel
            text={isPlLanguage ? "Data zakończenia" : "End date"}
          />
        ),
      },
    },
    {
      size: 12,
      props: {
        name: "description",
        multiline: true,
        label: <RequiredLabel text={isPlLanguage ? "Opis" : "Description"} />,
      },
    },
  ];

  return (
    <Grid container spacing={2}>
      {fields.map(
        ({
          skip = false,
          size = 6,
          props = {},
          component: FieldComponent = ControlledTextField,
        }) => (
          <Grid size={size}>
            {skip ? null : (
              /* @ts-ignore */
              <FieldComponent {...props} />
            )}
          </Grid>
        ),
      )}
    </Grid>
  );
}
