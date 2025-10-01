import { useUserContext } from "../../../auth/UserContext";
import { MenuItem } from "@mui/material";
import { useGetGenres } from "../../../api/clients/genreClient";
import ControlledSelect from "../../Form/Input/ControlledSelect";

export default function GenreFilterSelect() {
  const { data: { genres = [] } = {} } = useGetGenres({
    availableInBookshelf: true,
  });

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <ControlledSelect
      name="genreId"
      renderValue={(genreId) =>
        genres.find((g) => g.id === genreId)?.name ?? ""
      }
      label={isPlLanguage ? "Gatunek" : "Genre"}
    >
      {genres.map((g) => (
        <MenuItem key={g.id} value={g.id}>
          {g.name}
        </MenuItem>
      ))}
    </ControlledSelect>
  );
}
