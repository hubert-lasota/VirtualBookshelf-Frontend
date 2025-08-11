import { Box, Stack, Typography } from "@mui/material";
import { useUserContext } from "../../../../common/auth/UserContext";
import { Target } from "lucide-react";

export default function ChallengeAuthorBadge() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <Box
      sx={(theme) => ({
        borderRadius: theme.shape.borderRadius,
        border: `1px solid ${theme.palette.primary["600"]}`,
        backgroundColor: theme.palette.primary["100"],
        paddingBlock: theme.spacing(0.5),
        paddingInline: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.primary["900"],
      })}
    >
      <Stack
        direction="row"
        spacing={0.5}
        justifyContent="center"
        alignItems="center"
      >
        <Target style={{ width: "0.8rem", height: "0.8rem" }} />
        <Typography variant="body2">
          {isPlLanguage ? "Autor" : "Author"}
        </Typography>
      </Stack>
    </Box>
  );
}
