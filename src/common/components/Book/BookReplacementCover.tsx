import { StackProps } from "@mui/material";
import { BookOpenIcon } from "lucide-react";
import ResourceReplacementImage from "../Resource/ResourceReplacementImage";

export default function BookReplacementCover(props: StackProps) {
  return <ResourceReplacementImage icon={BookOpenIcon} {...props} />;
}
