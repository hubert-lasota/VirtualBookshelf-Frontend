import { ReadingSessionResponse } from "../../../../common/models/readingSessionModels";
import { ReadingSessionContext } from "./ReadingSessionContext";
import ReadingSessionCardHeader from "./ReadingSessionCardHeader";
import { Paper, Stack, Typography } from "@mui/material";
import SessionDuration from "./SessionDuration";
import SessionStartDate from "./SessionStartDate";
import SessionPageCount from "./SessionPageCount";

type ReadingSessionCardProps = {
  session: ReadingSessionResponse;
};

export default function ReadingSessionCard({
  session,
}: ReadingSessionCardProps) {
  return (
    <ReadingSessionContext.Provider value={session}>
      <Stack
        spacing={1}
        component={Paper}
        variant="outlined"
        sx={(theme) => ({
          paddingBlock: theme.spacing(2),
          paddingInline: theme.spacing(3),
          borderRadius: theme.shape.borderRadius,
        })}
      >
        <ReadingSessionCardHeader />
        <Typography variant="body1" color="textSecondary">
          {session.book.authors.map((a) => a.fullName).join(", ")}
        </Typography>

        <Typography variant="subtitle1">{session.description}</Typography>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={(theme) => ({
            color: theme.palette.text.secondary,
            fontSize: 16,
          })}
        >
          <SessionStartDate />
          <SessionDuration />
          <SessionPageCount />
        </Stack>
      </Stack>
    </ReadingSessionContext.Provider>
  );
}
