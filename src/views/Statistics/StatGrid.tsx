import { Grid } from "@mui/material";
import { useUserContext } from "../../common/auth/UserContext";
import { BookOpenIcon, TrendingUpIcon, Clock4Icon } from "lucide-react";
import StatCard from "./StatCard";

export default function StatGrid() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const cardProps = [
    {
      title: isPlLanguage ? "Przeczytane książki" : "Read books",
      icon: BookOpenIcon,
      value: 100,
      valueLabel: "2 tym miesiacu",
    },
    {
      title: isPlLanguage ? "Przeczytane strony" : "Read pages",
      icon: TrendingUpIcon,
      value: 1500,
      valueLabel: "120 tym miesiacu",
    },
    {
      title: isPlLanguage ? "Czas czytania" : "Reading time",
      icon: Clock4Icon,
      value: 100,
      valueLabel: "100 minut",
    },
  ];

  return (
    <Grid container spacing={2}>
      {cardProps.map((props) => (
        <Grid size={3}>
          <StatCard {...props} />
        </Grid>
      ))}
    </Grid>
  );
}
