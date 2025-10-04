import RecommendedResourceContainer from "./RecommendedResourceContainer";
import { useGetRecommendedGenres } from "../../common/api/clients/recommendationClient";
import { MAX_RESOURCES_IN_ROW } from "./config";
import { useUserContext } from "../../common/auth/UserContext";
import GenreCard from "../../common/components/Genre/GenreCard";
import { useNavigate } from "react-router-dom";

export default function RecommendedGenresCard() {
  const { data: { genres = [] } = {} } = useGetRecommendedGenres();
  const slicedGenres = genres.slice(0, MAX_RESOURCES_IN_ROW);

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const navigate = useNavigate();

  return (
    <RecommendedResourceContainer
      title={
        isPlLanguage ? "Rekomendowane gatunki literackie" : "Recommended genres"
      }
      onClickSeeMore={() => navigate("/recommended-genres")}
    >
      {slicedGenres.map((genre) => (
        <GenreCard key={genre.id} genre={genre} />
      ))}
    </RecommendedResourceContainer>
  );
}
