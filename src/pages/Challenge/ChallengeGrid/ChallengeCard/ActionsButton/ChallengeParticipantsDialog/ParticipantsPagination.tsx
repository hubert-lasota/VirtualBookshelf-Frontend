import { Pagination, Stack } from "@mui/material";

type Props = {
  totalPages: number;
  page: number;
  onPageChange: (page: number) => void;
};

export default function ParticipantsPagination({
  totalPages,
  page,
  onPageChange,
}: Props) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <Stack
      direction="row"
      justifyContent="center"
      sx={(theme) => ({
        padding: theme.spacing(2, 3),
        backgroundColor: theme.palette.background.default,
      })}
    >
      <Pagination
        count={totalPages}
        page={page + 1}
        onChange={(_e, page) => onPageChange(page - 1)}
        color="primary"
        size="small"
      />
    </Stack>
  );
}
