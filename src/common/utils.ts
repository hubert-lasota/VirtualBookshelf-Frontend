import { SxProps, Theme } from "@mui/material";

export function mergeSx(
  firstSx: SxProps<Theme>,
  secondSx: SxProps<Theme> | undefined,
): SxProps<Theme> {
  if (!secondSx) return firstSx;

  const firstSxArray = Array.isArray(firstSx) ? firstSx : [firstSx];
  const secondSxArray = Array.isArray(secondSx) ? secondSx : [secondSx];
  return [...firstSxArray, ...secondSxArray];
}
