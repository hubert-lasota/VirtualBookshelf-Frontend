import ChallengesViewHeader from "./ChallengesViewHeader";
import InfoCard, { InfoCardColor } from "../InfoCard";
import { Stack } from "@mui/material";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import BarChartIcon from "@mui/icons-material/BarChart";

const infoCards = [
  {
    title: "Aktywne wyzwania",
    value: 2,
    icon: TrackChangesIcon,
    color: "secondary" as InfoCardColor,
  },
  {
    title: "Ukończone wyzwania",
    value: 5,
    icon: EmojiEventsIcon,
    color: "success" as InfoCardColor,
  },
  {
    title: "Przeczytane książki",
    value: 124,
    icon: AutoStoriesIcon,
    color: "info" as InfoCardColor,
  },
  {
    title: "Wyzwania miesięczne",
    value: 3,
    icon: BarChartIcon,
    color: "warning" as InfoCardColor,
  },
];
export default function ChallengesView() {
  return (
    <Stack
      spacing={4}
      sx={(theme) => ({
        padding: theme.spacing(4),
        width: "100%",
        height: "100%",
      })}
    >
      <ChallengesViewHeader />
      <Stack
        direction="row"
        spacing={5}
        sx={{ width: "100%", justifyContent: "space-between" }}
      >
        {infoCards.map((props) => (
          <InfoCard {...props} sx={{ flexGrow: 1 }} />
        ))}
      </Stack>
    </Stack>
  );
}
