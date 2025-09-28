import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import StatusBadge from "../../StatusBadge";
import { ChallengeParticipantResponse } from "../../../../../../common/models/challengePartictipantModels";

type Props = {
  participant: ChallengeParticipantResponse;
};

export default function ParticipantListItem({ participant }: Props) {
  const { profile } = participant.user;
  const fullName = profile.firstName + " " + profile.lastName;
  return (
    <Box
      sx={(theme) => ({
        borderBottom: `1px solid ${theme.palette.divider}`,
        "&:hover": {
          backgroundColor: theme.palette.action.hover,
        },
        "&:last-child": {
          borderBottomWidth: 0,
        },
      })}
    >
      <ListItem
        key={participant.id}
        sx={(theme) => ({
          padding: theme.spacing(1.5, 3),
        })}
      >
        <ListItemAvatar>
          <Avatar
            src={profile.pictureUrl}
            alt={fullName}
            sx={{
              width: 40,
              height: 40,
              fontWeight: 600,
            }}
          >
            {profile.firstName.charAt(0).toUpperCase()}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={
            <Typography variant="body1" color="textPrimary">
              {fullName}
            </Typography>
          }
        />
        <StatusBadge status={participant.status} />
      </ListItem>
    </Box>
  );
}
