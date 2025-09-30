import { Button } from "@mui/material";
import { useUserContext } from "../../../../../common/auth/UserContext";
import {
  CHALLENGE_QUERY_KEY,
  useJoinChallenge,
} from "../../../../../common/api/clients/challengeClient";
import { useChallengeContext } from "../../../ChallengeContext";
import { useDialogContext } from "../../../../../common/context/DialogContext";
import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { useState } from "react";

export default function JoinChallengeButton() {
  const [loading, setLoading] = useState(false);
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { onClose } = useDialogContext();
  const { id } = useChallengeContext();
  const { mutateAsync } = useJoinChallenge();

  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  const handleJoin = async () => {
    try {
      setLoading(true);
      await mutateAsync(id);
      await queryClient.invalidateQueries({
        queryKey: CHALLENGE_QUERY_KEY,
        exact: false,
      });
      enqueueSnackbar({
        message: isPlLanguage
          ? "Poprawnie dołączono do wyzwania"
          : "Successfully joined challenge",
        variant: "success",
      });
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="contained"
      fullWidth
      onClick={handleJoin}
      loading={loading}
    >
      {isPlLanguage ? "Dołącz do wyzwania" : "Join challenge"}
    </Button>
  );
}
