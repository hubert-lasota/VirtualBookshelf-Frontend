import { useUserContext } from "../../auth/UserContext";
import { LinearProgress, Stack, Typography } from "@mui/material";

type Props = {
  progressPercentage: number;
  value: number;
  maxValue: number;
  valueSuffix: string;
};

export default function CommonLinearProgress({
  progressPercentage,
  value,
  maxValue,
  valueSuffix,
}: Props) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle2" color="textPrimary">
          {isPlLanguage ? "Postęp " : "Progress "}
          {`${progressPercentage}%`}
        </Typography>
        <Typography variant="subtitle2" color="textPrimary">
          {value}
          {" / "}
          {maxValue}
          {valueSuffix}
        </Typography>
      </Stack>
      <LinearProgress
        value={progressPercentage}
        variant="determinate"
        sx={{ borderRadius: "6px" }}
        color="success"
      />
    </Stack>
  );
}
