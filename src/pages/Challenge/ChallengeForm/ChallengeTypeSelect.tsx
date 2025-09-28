import { useUserContext } from "../../../common/auth/UserContext";
import { MenuItem } from "@mui/material";
import { ChallengeType } from "../../../common/models/challengeModels";
import ControlledSelect from "../../../common/components/FormInput/ControlledSelect";
import RequiredLabel from "../../../common/components/Label/RequiredLabel";

export default function CChallengeTypeSelect() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const types = [
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

  return (
    <ControlledSelect
      name="type"
      label={
        <RequiredLabel
          text={isPlLanguage ? "Typ wyzwania" : "Challenge type"}
        />
      }
    >
      {types.map(({ value, label }) => (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      ))}
    </ControlledSelect>
  );
}
