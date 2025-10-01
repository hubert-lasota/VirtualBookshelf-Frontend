import { useUserContext } from "../../common/auth/UserContext";
import { MenuItem } from "@mui/material";
import ControlledSelect from "../../common/components/Form/Input/ControlledSelect";
import RequiredLabel from "../../common/components/Label/RequiredLabel";
import { ChallengeType } from "../../common/models/challengeModels";

type Props = {
  showRequiredLabel?: boolean;
};

export default function ChallengeTypeSelect({
  showRequiredLabel = true,
}: Props) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const items = [
    {
      value: ChallengeType.BOOK_COUNT,
      label: isPlLanguage ? "Ilość książek" : "Number of books",
    },
    {
      value: ChallengeType.PAGE_COUNT,
      label: isPlLanguage ? "Ilość stron" : "Number of pages",
    },
    {
      value: ChallengeType.GENRE_COUNT,
      label: isPlLanguage
        ? "Ilość różnych gatunków"
        : "Number of different genres",
    },
    {
      value: ChallengeType.GENRE_BOOKS,
      label: isPlLanguage
        ? "Ilość książek konkretnego gatunku"
        : "Number of books of specific genre",
    },
    {
      value: ChallengeType.AUTHOR_COUNT,
      label: isPlLanguage
        ? "Ilość książek różnych autorów"
        : "Number of books of different authors",
    },
  ];

  const label = isPlLanguage ? "Typ wyzwania" : "Challenge type";
  return (
    <ControlledSelect
      name="type"
      label={showRequiredLabel ? <RequiredLabel text={label} /> : label}
    >
      {items.map(({ value, label }) => (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      ))}
    </ControlledSelect>
  );
}
