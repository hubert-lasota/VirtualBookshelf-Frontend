import { VIEW_SPACING } from "../LoggedInViewContainer/config";
import { useParams } from "react-router-dom";
import { Stack } from "@mui/material";
import { useGetAuthorById } from "../../common/api/clients/authorClient";
import { AuthorDetailsContext } from "./AuthorDetailsContext";
import AuthorDetailsCard from "./AuthorDetailsCard/AuthorDetailsCard";

export default function AuthorView() {
  const { id } = useParams();

  const { data: author, isLoading } = useGetAuthorById(Number(id));

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <AuthorDetailsContext.Provider value={author!}>
      <Stack
        spacing={4}
        sx={(theme) => ({ padding: theme.spacing(VIEW_SPACING) })}
      >
        <AuthorDetailsCard />
      </Stack>
    </AuthorDetailsContext.Provider>
  );
}
