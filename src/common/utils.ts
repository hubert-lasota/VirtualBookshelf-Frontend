import { SxProps, Theme } from "@mui/material";
import { MoreActionsButtonItem } from "./components/Button/MoreActionsButton";

export function mergeSx(
  ...styles: Array<SxProps<Theme> | undefined>
): SxProps<Theme> {
  return styles
    .filter(Boolean)
    .flatMap((sx) => (Array.isArray(sx) ? sx : [sx]));
}

type GetDestructiveMenuItemPropsParams = Pick<
  MoreActionsButtonItem,
  "iconProps" | "props"
>;

export const getDestructiveMenuItemProps = ({
  iconProps: { sx: iconSx, ...iconProps } = {},
  props: { sx: propsSx, ...props } = {},
}: GetDestructiveMenuItemPropsParams = {}): Pick<
  MoreActionsButtonItem,
  "iconProps" | "props"
> => ({
  iconProps: {
    sx: mergeSx((theme) => ({ color: theme.palette.error.light }), iconSx),
    ...iconProps,
  },
  props: {
    sx: mergeSx(
      (theme) => ({
        color: theme.palette.error.dark,
        "&:hover": {
          backgroundColor: theme.palette.error["50"],
        },
      }),
      propsSx,
    ),
    ...props,
  },
});
