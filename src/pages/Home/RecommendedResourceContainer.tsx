import { Button, Stack } from "@mui/material";
import { ReactNode } from "react";
import { useUserContext } from "../../common/auth/UserContext";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LoggedInPageTitle from "../LoggedInLayout/LoggedInPageTitle";

type Props = {
  title: string;
  onClickSeeMore: () => void;
  children: ReactNode;
};

export default function RecommendedResourceContainer({
  title,
  onClickSeeMore,
  children,
}: Props) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <Stack
      spacing={2}
      sx={(theme) => ({
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(2),
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.divider}`,
        boxShadow: theme.shadows[1],
      })}
    >
      <Stack direction="row" justifyContent="space-between">
        <LoggedInPageTitle>{title}</LoggedInPageTitle>
        <Button onClick={onClickSeeMore} endIcon={<ArrowForwardIcon />}>
          {isPlLanguage ? "Zobacz więcej" : "See more"}
        </Button>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        {children}
      </Stack>
    </Stack>
  );
}
