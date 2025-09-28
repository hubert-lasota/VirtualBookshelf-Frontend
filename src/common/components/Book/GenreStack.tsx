import { GenreResponse } from "../../models/genreModels";
import { Stack, StackProps } from "@mui/material";
import GenreChip from "./GenreChip";

type GenreStackProps = {
  genres: GenreResponse[];
} & StackProps;

export default function GenreStack({ genres, ...props }: GenreStackProps) {
  return (
    <Stack direction="row" spacing={1} {...props}>
      {genres.map((genre) => (
        <GenreChip genre={genre} />
      ))}
    </Stack>
  );
}
