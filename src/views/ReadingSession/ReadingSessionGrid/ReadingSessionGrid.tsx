import { useGetReadingSessions } from "../../../common/api/clients/readingSessionClient";
import { Grid } from "@mui/material";
import ReadingSessionCard from "./ReadingSessionCard/ReadingSessionCard";

export default function ReadingSessionGrid() {
  const { data: { sessions = [] } = {} } = useGetReadingSessions();

  return (
    <Grid container spacing={2}>
      {sessions.map((s) => (
        <Grid key={s.id} size={3}>
          <ReadingSessionCard session={s} />
        </Grid>
      ))}
    </Grid>
  );
}
