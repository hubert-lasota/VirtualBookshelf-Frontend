import { StackProps } from "@mui/material";
import { User as UserIcon } from "lucide-react";
import ResourceReplacementImage from "../../../common/components/Resource/ResourceReplacementImage";

export default function AuthorReplacementPhoto(props: StackProps) {
  return <ResourceReplacementImage icon={UserIcon} {...props} />;
}
