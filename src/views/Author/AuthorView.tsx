import { useParams } from "react-router-dom";
import { useGetAuthorById } from "../../common/api/clients/authorClient";
import { AuthorDetailsContext } from "./AuthorDetailsContext";
import AuthorDetailsCard from "./AuthorDetailsCard/AuthorDetailsCard";
import ViewContainer from "../../common/components/ui/View/ViewContainer";

export default function AuthorView() {
  const { id } = useParams();

  const { data: author, isLoading } = useGetAuthorById(Number(id));

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <AuthorDetailsContext.Provider value={author!}>
      <ViewContainer spacing={4}>
        <AuthorDetailsCard />
      </ViewContainer>
    </AuthorDetailsContext.Provider>
  );
}
