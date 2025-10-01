import ControlledNumberField from "../../Form/Input/ControlledNumberField";
import { useUserContext } from "../../../auth/UserContext";

type Props = {
  rangeField: "lte" | "gte";
  namePrefix: string;
  labelPrefix: string;
};

export default function NumberRangeField({
  rangeField,
  namePrefix,
  labelPrefix,
}: Props) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const lteSuffix = isPlLanguage ? " (do)" : " (to)";
  const gteSuffix = isPlLanguage ? " (od)" : " (from)";
  return (
    <ControlledNumberField
      name={`${namePrefix}.${rangeField}`}
      label={labelPrefix + (rangeField === "lte" ? lteSuffix : gteSuffix)}
    />
  );
}
