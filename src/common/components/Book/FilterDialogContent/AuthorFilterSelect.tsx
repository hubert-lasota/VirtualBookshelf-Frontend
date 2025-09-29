import { MenuItem } from "@mui/material";
import { useGetAuthors } from "../../../api/clients/authorClient";
import { useUserContext } from "../../../auth/UserContext";
import SimpleSelect from "../../Input/SimpleSelect";

type AuthorFilterSelectProps = {
  authorId?: number;
  onAuthorIdChange: (authorId: number) => void;
};
export default function AuthorFilterSelect({
  authorId,
  onAuthorIdChange,
}: AuthorFilterSelectProps) {
  const { data: { authors = [] } = {} } = useGetAuthors({
    availableInBookshelf: true,
  });

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <SimpleSelect
      value={authorId}
      renderValue={(authorId) =>
        authors.find((a) => a.id === authorId)?.fullName ?? ""
      }
      onChange={(e) => onAuthorIdChange(Number(e.target.value))}
      label={isPlLanguage ? "Autor" : "Author"}
    >
      {authors.map((a) => (
        <MenuItem key={a.id} value={a.id}>
          {a.fullName}
        </MenuItem>
      ))}
    </SimpleSelect>
  );
}
