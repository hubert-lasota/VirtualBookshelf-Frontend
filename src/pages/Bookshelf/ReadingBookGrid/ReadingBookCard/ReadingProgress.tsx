import { useUserContext } from "../../../../common/auth/UserContext";
import { useReadingBookContext } from "./ReadingBookContext";
import CommonLinearProgress from "../../../../common/components/Progress/CommonLinearProgress";

export default function ReadingProgress() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { progressPercentage, currentPage, book } = useReadingBookContext();

  return (
    <CommonLinearProgress
      progressPercentage={progressPercentage}
      value={currentPage}
      maxValue={book.pageCount}
      valueSuffix={isPlLanguage ? " str." : " pages"}
    />
  );
}
