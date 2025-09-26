import { Box, Stack, Typography } from "@mui/material";
import { useChallengeContext } from "./ChallengeContext";
import { ChallengeParticipantStatus } from "../../../../common/models/challengePartictipantModels";
import { CircleCheckBig, CircleSlash2, Play } from "lucide-react";
import { useUserContext } from "../../../../common/auth/UserContext";
import React from "react";

const getStyleInfo = (
  status: ChallengeParticipantStatus,
  isPlLanguage: boolean,
): {
  paletteKey: "info" | "success" | "error";
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  status: string;
} => {
  switch (status) {
    case ChallengeParticipantStatus.ACTIVE:
      return {
        paletteKey: "info",
        icon: Play,
        status: isPlLanguage ? "Aktywny" : "Active",
      };
    case ChallengeParticipantStatus.COMPLETED:
      return {
        paletteKey: "success",
        icon: CircleCheckBig,
        status: isPlLanguage ? "Ukończono" : "Completed",
      };
    case ChallengeParticipantStatus.UNCOMPLETED:
      return {
        paletteKey: "error",
        icon: CircleSlash2,
        status: isPlLanguage ? "Nie ukończono" : "Uncompleted",
      };
  }
};

export default function StatusBadge() {
  const { participation } = useChallengeContext();
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  if (!participation.participates) {
    return null;
  }
  const {
    paletteKey,
    icon: Icon,
    status,
  } = getStyleInfo(participation.status, isPlLanguage);
  return (
    <Box
      sx={(theme) => ({
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette[paletteKey]["600"]}`,
        backgroundColor: theme.palette[paletteKey]["100"],
        paddingBlock: theme.spacing(0.5),
        paddingInline: theme.spacing(2),
        textAlign: "center",
        color: theme.palette[paletteKey]["900"],
      })}
    >
      <Stack
        direction="row"
        spacing={0.5}
        justifyContent="center"
        alignItems="center"
      >
        <Icon style={{ width: "0.8rem", height: "0.8rem" }} />
        <Typography variant="body2">{status}</Typography>
      </Stack>
    </Box>
  );
}
