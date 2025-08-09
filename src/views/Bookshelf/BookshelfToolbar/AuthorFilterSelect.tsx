import { FormControl, MenuItem, Select, Typography } from "@mui/material";
import { useGetAuthors } from "../../../common/api/clients/authorClient";
import { useUserContext } from "../../../common/auth/UserContext";

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
    <FormControl>
      <Typography>{isPlLanguage ? "Autor" : "Author"}</Typography>
      <Select
        variant="outlined"
        value={authorId ?? ""}
        renderValue={(authorId) =>
          authors.find((a) => a.id === authorId)?.fullName ?? ""
        }
        onChange={(e) => onAuthorIdChange(e.target.value)}
      >
        {authors.map((a) => (
          <MenuItem key={a.id} value={a.id}>
            {a.fullName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
