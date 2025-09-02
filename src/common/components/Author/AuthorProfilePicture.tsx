import ResourceReplacementImage from "../Resource/ResourceReplacementImage";
import { Stack, StackProps } from "@mui/material";
import { UserCheck } from "lucide-react";

type AuthorProfilePictureProps = {
  profilePictureUrl: string | null;
} & StackProps;

export default function AuthorProfilePicture({
  profilePictureUrl,
  ...props
}: AuthorProfilePictureProps) {
  return profilePictureUrl ? (
    <Stack component="img" src={profilePictureUrl} {...props} />
  ) : (
    <ResourceReplacementImage {...props} icon={UserCheck} />
  );
}
