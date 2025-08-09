import { useUserContext } from "../../../common/auth/UserContext";
import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import { useGetGenres } from "../../../common/api/clients/genreClient";

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
    <FormControl>
      <Typography>{isPlLanguage ? "Gatunek" : "Genre"}</Typography>
      <Select
        variant="outlined"
        value={genreId ?? ""}
        renderValue={(genreId) =>
          genres.find((g) => g.id === genreId)?.name ?? ""
        }
        onChange={(e) => onGenreIdChange(e.target.value)}
      >
        {genres.map((g) => (
          <MenuItem key={g.id} value={g.id}>
            {g.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
