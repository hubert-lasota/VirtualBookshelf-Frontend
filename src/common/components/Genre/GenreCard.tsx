import { Chip, Stack, Typography } from "@mui/material";
import { GenreResponse } from "../../models/genreModels";
import { useUserContext } from "../../auth/UserContext";
import { useNavigate } from "react-router-dom";

type Props = {
  genre: GenreResponse;
};

export default function GenreCard({ genre }: Props) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const navigate = useNavigate();

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={(theme) => ({
        padding: theme.spacing(2),
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.divider}`,
        backgroundImage: `linear-gradient(to bottom right, ${theme.palette.grey["100"]}, ${theme.palette.grey["50"]})`,
        boxShadow: theme.shadows[1],
        transition: theme.transitions.create("box-shadow"),
        "&:hover": {
          boxShadow: theme.shadows[4],
        },
        cursor: "pointer",
      })}
      spacing={10}
      onClick={() => navigate(`/genres/${genre.id}`)}
    >
      <Typography variant="h6" color="textPrimary">
        {genre.name}
      </Typography>
      <Chip label={genre.totalBooks + (isPlLanguage ? " książek" : " books")} />
    </Stack>
  );
}
