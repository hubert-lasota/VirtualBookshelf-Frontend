import { ReadingSessionResponse } from "../../../../common/models/readingSessionModels";
import { ReadingSessionContext } from "./ReadingSessionContext";
import ReadingSessionCardHeader from "./ReadingSessionCardHeader";
import { Stack, Typography } from "@mui/material";

type ReadingSessionCardProps = {
  session: ReadingSessionResponse;
};

export default function ReadingSessionCard({
  session,
}: ReadingSessionCardProps) {
  return (
    <ReadingSessionContext.Provider value={session}>
      <Stack spacing={1}>
        <ReadingSessionCardHeader />
        <Typography variant="body2" color="textSecondary">
          {session.book.authors.map((a) => a.fullName).join(", ")}
        </Typography>
      </Stack>
    </ReadingSessionContext.Provider>
  );
}
