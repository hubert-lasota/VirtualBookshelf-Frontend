import RecommendedResourceContainer from "./RecommendedResourceContainer";
import { useGetRecommendedAuthors } from "../../common/api/clients/recommendationClient";
import { MAX_RESOURCES_IN_ROW, RESOURCE_IMG_SX } from "./config";
import AuthorCard from "../../common/components/Author/AuthorCard";
import { useUserContext } from "../../common/auth/UserContext";
import { useNavigate } from "react-router-dom";

export default function RecommendedAuthorsCard() {
  const { data: { authors = [] } = {} } = useGetRecommendedAuthors();
  const slicedAuthors = authors.slice(0, MAX_RESOURCES_IN_ROW);

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const navigate = useNavigate();

  return (
    <RecommendedResourceContainer
      title={isPlLanguage ? "Rekomendowani autorzy" : "Recommended authors"}
      onClickSeeMore={() => navigate("/recommended-authors")}
    >
      {slicedAuthors.map((author) => (
        <AuthorCard
          key={author.id}
          author={author}
          authorProfilePictureProps={{ sx: RESOURCE_IMG_SX }}
        />
      ))}
    </RecommendedResourceContainer>
  );
}
