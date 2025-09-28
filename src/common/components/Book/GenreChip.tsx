import { Chip, ChipProps } from "@mui/material";
import { GenreResponse } from "../../models/genreModels";
import { mergeSx } from "../../utils";

type GenreChipProps = {
  genre: GenreResponse;
} & ChipProps;

const chipSx = { borderRadius: "6px", height: "23px" };

export default function GenreChip({ genre, sx }: GenreChipProps) {
  return <Chip label={genre.name} sx={mergeSx(chipSx, sx)} />;
}
