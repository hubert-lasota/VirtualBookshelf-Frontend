import { MenuItem } from "@mui/material";
import { getChallengeTypeMenuItems } from "../shared";
import { useUserContext } from "../../../common/auth/UserContext";
import { ChallengeType } from "../../../common/models/challengeModels";
import SimpleSelect from "../../../common/components/Input/SimpleSelect";

type Props = {
  type?: ChallengeType;
  onTypeChange: (type: ChallengeType) => void;
};

export default function ChallengeTypeSelect({ type, onTypeChange }: Props) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <SimpleSelect
      label={isPlLanguage ? "Typ wyzwania" : "Challenge type"}
      value={type}
      onChange={(e) => onTypeChange(e.target.value as ChallengeType)}
    >
      {getChallengeTypeMenuItems(isPlLanguage).map(({ value, label }) => (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      ))}
    </SimpleSelect>
  );
}
