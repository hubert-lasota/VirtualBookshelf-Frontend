import { DialogContent, Grid } from "@mui/material";
import { useUserContext } from "../../../common/auth/UserContext";
import ControlledDatePicker from "../../../common/components/Form/Input/ControlledDatePicker";
import ChallengeTypeSelect from "../ChallengeTypeSelect";

export default function ChallengeFilterFormContent() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const components = [
    <ControlledDatePicker
      label={isPlLanguage ? "Data rozpoczęcia" : "Start date"}
      name="durationRange.lte"
    />,
    <ControlledDatePicker
      label={isPlLanguage ? "Data zakończenia" : "End date"}
      name={"durationRange.gte"}
    />,
    <ChallengeTypeSelect showRequiredLabel={false} />,
  ];

  return (
    <DialogContent>
      <Grid container spacing={2}>
        {components.map((c) => (
          <Grid size={6}>{c}</Grid>
        ))}
      </Grid>
    </DialogContent>
  );
}
