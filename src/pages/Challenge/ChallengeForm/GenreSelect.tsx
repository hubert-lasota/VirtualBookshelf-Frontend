import { useGetGenres } from "../../../common/api/clients/genreClient";
import { MenuItem } from "@mui/material";
import { useUserContext } from "../../../common/auth/UserContext";
import RequiredLabel from "../../../common/components/Label/RequiredLabel";
import ControlledSelect from "../../../common/components/FormInput/ControlledSelect";

export default function GenreSelect() {
  const { data: { genres = [] } = {} } = useGetGenres();

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <ControlledSelect
      name="genreId"
      shouldUnregister
      label={<RequiredLabel text={isPlLanguage ? "Gatunek" : "Genre"} />}
      renderValue={(genreId) =>
        genres.find((g) => g.id === genreId)?.name ?? ""
      }
    >
      {genres.map((g) => (
        <MenuItem key={g.id} value={g.id}>
          {g.name}
        </MenuItem>
      ))}
    </ControlledSelect>
  );
}
