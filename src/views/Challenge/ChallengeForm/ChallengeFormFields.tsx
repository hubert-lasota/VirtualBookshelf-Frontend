import { Grid } from "@mui/material";
import GenreSelect from "./GenreSelect";
import { useUserContext } from "../../../common/auth/UserContext";
import RequiredLabel from "../../../common/components/ui/Label/RequiredLabel";
import ControlledTextField from "../../../common/components/FormInput/ControlledTextField";
import { useWatch } from "react-hook-form";
import ChallengeTypeSelect from "./ChallengeTypeSelect";
import { ChallengeType } from "../../../common/models/challengeModels";

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
      props: {
        name: "targetCount",
        label: <RequiredLabel text={isPlLanguage ? "Cel" : "Target count"} />,
      },
    },
    {
      component: ChallengeTypeSelect,
    },
    {
      skip: type !== ChallengeType.GENRE_BOOKS,
      component: GenreSelect,
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
        }) =>
          skip ? null : (
            <Grid size={size}>
              {/*@ts-ignore*/}
              <FieldComponent {...props} />
            </Grid>
          ),
      )}
    </Grid>
  );
}
