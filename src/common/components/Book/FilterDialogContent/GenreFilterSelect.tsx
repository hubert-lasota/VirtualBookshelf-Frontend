import { useUserContext } from "../../../auth/UserContext";
import { MenuItem } from "@mui/material";
import { useGetGenres } from "../../../api/clients/genreClient";
import SimpleSelect from "../../Input/SimpleSelect";

type GenreFilterSelectProps = {
  genreId?: number;
  onGenreIdChange: (genreId: number) => void;
};

export default function GenreFilterSelect({
  genreId,
  onGenreIdChange,
}: GenreFilterSelectProps) {
  const { data: { genres = [] } = {} } = useGetGenres({
    availableInBookshelf: true,
  });

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <SimpleSelect
      value={genreId}
      renderValue={(genreId) =>
        genres.find((g) => g.id === genreId)?.name ?? ""
      }
      onChange={(e) => onGenreIdChange(Number(e.target.value))}
      label={isPlLanguage ? "Gatunek" : "Genre"}
    >
      {genres.map((g) => (
        <MenuItem key={g.id} value={g.id}>
          {g.name}
        </MenuItem>
      ))}
    </SimpleSelect>
  );
}
