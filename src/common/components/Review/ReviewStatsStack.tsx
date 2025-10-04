import { useUserContext } from "../../auth/UserContext";
import { Stack, Typography } from "@mui/material";
import { UserStarIcon } from "lucide-react";
import StarRateIcon from "@mui/icons-material/StarRate";

type Props = {
  averageRating: number;
  totalReviews: number;
  iconSize?: string;
  fontSize?: string;
};

export default function ReviewStatsStack({
  averageRating,
  totalReviews,
  iconSize = "16px",
  fontSize = "12px",
}: Props) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const items = [
    {
      icon: StarRateIcon,
      text:
        averageRating + (isPlLanguage ? " średnia ocena" : " average rating"),
    },
    {
      icon: UserStarIcon,
      text: totalReviews + (isPlLanguage ? " ocen" : " ratings"),
    },
  ];

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      {items.map(({ icon: Icon, text }) => (
        <Stack
          direction="row"
          alignItems="center"
          spacing={0.5}
          sx={(theme) => ({ color: theme.palette.text.secondary })}
        >
          <Icon style={{ width: iconSize }} />
          <Typography color="textSecondary" fontSize={fontSize}>
            {text}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}
