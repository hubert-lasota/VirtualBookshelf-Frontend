import { MenuItem } from "@mui/material";
import { useGetAuthors } from "../../../api/clients/authorClient";
import { useUserContext } from "../../../auth/UserContext";
import ControlledSelect from "../../Form/Input/ControlledSelect";

export default function AuthorFilterSelect() {
  const { data: { authors = [] } = {} } = useGetAuthors({
    availableInBookshelf: true,
  });

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <ControlledSelect
      name="authorId"
      renderValue={(authorId) =>
        authors.find((a) => a.id === authorId)?.fullName ?? ""
      }
      label={isPlLanguage ? "Autor" : "Author"}
    >
      {authors.map((a) => (
        <MenuItem key={a.id} value={a.id}>
          {a.fullName}
        </MenuItem>
      ))}
    </ControlledSelect>
  );
}
