import { Stack, StackProps } from "@mui/material";

import BookReplacementCover from "./BookReplacementCover";

type BookCoverProps = {
  coverUrl: string | null;
} & StackProps;

export default function BookCover({ coverUrl, ...props }: BookCoverProps) {
  return coverUrl ? (
    <Stack component="img" src={coverUrl} {...props} />
  ) : (
    <BookReplacementCover {...props} />
  );
}
