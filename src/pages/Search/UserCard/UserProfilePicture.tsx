import { Stack, StackProps } from "@mui/material";
import ResourceReplacementImage from "../../../common/components/Resource/ResourceReplacementImage";
import { User } from "lucide-react";

export type UserProfilePictureProps = {
  profilePictureUrl: string | null;
} & StackProps;

export default function UserProfilePicture({
  profilePictureUrl,
  ...props
}: UserProfilePictureProps) {
  return profilePictureUrl ? (
    <Stack component="img" src={profilePictureUrl} {...props} />
  ) : (
    <ResourceReplacementImage {...props} icon={User} />
  );
}
