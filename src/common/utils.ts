import { SxProps, Theme } from "@mui/material";

export function mergeSx(
  ...styles: Array<SxProps<Theme> | undefined>
): SxProps<Theme> {
  return styles
    .filter(Boolean)
    .flatMap((sx) => (Array.isArray(sx) ? sx : [sx]));
}
