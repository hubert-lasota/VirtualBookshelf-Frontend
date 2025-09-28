import { AuthorResponse } from "../../models/authorModels";
import { Typography, TypographyProps } from "@mui/material";

type AuthorListTypographyProps = {
  authors: AuthorResponse[];
} & TypographyProps;

export default function AuthorListTypography({
  authors,
  ...props
}: AuthorListTypographyProps) {
  return (
    <Typography color="textSecondary" variant="subtitle1" {...props}>
      {authors.map((a) => a.fullName).join(", ")}
    </Typography>
  );
}
