import { ReadingSessionResponse } from "../../../../../../../common/models/readingSessionModels";
import { ReadingSessionContext } from "./ReadingSessionContext";
import { Paper, Stack } from "@mui/material";

import SessionStats from "./SessionStats";

type ReadingSessionCardProps = {
  session: ReadingSessionResponse;
};

export default function SessionCard({ session }: ReadingSessionCardProps) {
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
          transition: "box-shadow 0.3s ease-in-out",
          "&:hover": {
            boxShadow: theme.shadows[3],
          },
        })}
      >
        <SessionStats />
      </Stack>
    </ReadingSessionContext.Provider>
  );
}
