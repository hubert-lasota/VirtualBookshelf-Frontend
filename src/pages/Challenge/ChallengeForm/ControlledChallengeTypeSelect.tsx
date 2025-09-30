import { useUserContext } from "../../../common/auth/UserContext";
import { MenuItem } from "@mui/material";
import ControlledSelect from "../../../common/components/Form/Input/ControlledSelect";
import RequiredLabel from "../../../common/components/Label/RequiredLabel";
import { getChallengeTypeMenuItems } from "../shared";

export default function ControlledChallengeTypeSelect() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <ControlledSelect
      name="type"
      label={
        <RequiredLabel
          text={isPlLanguage ? "Typ wyzwania" : "Challenge type"}
        />
      }
    >
      {getChallengeTypeMenuItems(isPlLanguage).map(({ value, label }) => (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      ))}
    </ControlledSelect>
  );
}
