import { Avatar, Stack, Typography } from "@mui/material";
import { useUserContext } from "../../common/auth/UserContext";

export default function UserNavItem() {
  const { user } = useUserContext();
  const userProfile = user.profile;
  const fullName = userProfile.firstName + " " + userProfile.lastName;
  return (
    <Stack direction="row" spacing={2} sx={{ cursor: "pointer" }}>
      <Avatar
        src={userProfile.pictureUrl}
        alt={fullName}
        sx={{ height: "40px", width: "40px" }}
      />
      <Stack>
        <Typography variant="subtitle2">{fullName}</Typography>
        <Typography variant="body2" color="primary">
          {user.username}
        </Typography>
      </Stack>
    </Stack>
  );
}
