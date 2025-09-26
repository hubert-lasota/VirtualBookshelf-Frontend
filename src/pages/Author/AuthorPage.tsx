import { useParams } from "react-router-dom";
import { useGetAuthorById } from "../../common/api/clients/authorClient";
import { AuthorDetailsContext } from "./AuthorDetailsContext";
import AuthorDetailsCard from "./AuthorDetailsCard/AuthorDetailsCard";
import LoggedInPageContainer from "../LoggedInLayout/LoggedInPageContainer";

export default function AuthorPage() {
  const { id } = useParams();

  const { data: author, isLoading } = useGetAuthorById(Number(id));

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <AuthorDetailsContext.Provider value={author!}>
      <LoggedInPageContainer spacing={4}>
        <AuthorDetailsCard />
      </LoggedInPageContainer>
    </AuthorDetailsContext.Provider>
  );
}
