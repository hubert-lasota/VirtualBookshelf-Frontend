import { useUserContext } from "../../../common/auth/UserContext";
import SimpleSelect from "../../../common/components/Input/SimpleSelect";
import { MenuItem } from "@mui/material";

type Props = {
  participating?: boolean;
  onParticipatingChange: (participating?: boolean) => void;
};

export default function ParticipatingSelect({
  participating,
  onParticipatingChange,
}: Props) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const value =
    participating === undefined ? "all" : participating ? "yes" : "no";

  const handleChange = (val: string) => {
    const newVal = val === "all" ? undefined : val === "yes";
    onParticipatingChange(newVal);
  };

  const items = [
    { value: "all", label: isPlLanguage ? "Wszystkie" : "All" },
    { value: "yes", label: isPlLanguage ? "Tak" : "Yes" },
    { value: "no", label: isPlLanguage ? "Nie" : "No" },
  ];

  return (
    <SimpleSelect
      value={value}
      onChange={(e) => handleChange(e.target.value as string)}
      label={isPlLanguage ? "Z uczestnicwtem" : "Participating"}
    >
      {items.map(({ value, label }) => (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      ))}
    </SimpleSelect>
  );
}
