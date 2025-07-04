import { useParams } from "react-router-dom";
import { useGetBookById } from "../../common/api/clients/bookClient";
import PageContainer from "../../common/components/ui/layout/PageContainer";
import { Box, Grid, Stack } from "@mui/material";
import LoggedInGlobalAppBar from "../../common/components/GlobalAppBar/LoggedInGlobalAppBar";
import { GLOBAL_APP_BAR_HEIGHT } from "../../common/components/GlobalAppBar/config";
import BookCard from "../../common/components/Book/Card/BookCard";
import BookDetails from "./BookDetails";
import BookReviews from "./BookReviews";

export default function BookPage() {
  const { id } = useParams();

  const { data: book, isLoading } = useGetBookById(Number(id));

  return (
    <PageContainer isLoading={isLoading}>
      <LoggedInGlobalAppBar />
      <Box sx={{ height: GLOBAL_APP_BAR_HEIGHT }} />
      <Grid
        container
        spacing={3}
        sx={(theme) => ({
          // marginTop: `calc(${GLOBAL_APP_BAR_HEIGHT} + ${theme.spacing(3)})`,
          marginTop: theme.spacing(3),
          paddingBottom: theme.spacing(3),
          paddingInline: theme.spacing(3),
          height: `calc(100% - ${GLOBAL_APP_BAR_HEIGHT})`,
        })}
      >
        <Grid size={3.5} sx={{ height: "100%" }}>
          <BookCard
            book={book}
            variant="outlined"
            sx={(theme) => ({
              padding: theme.spacing(3),
              width: "100%",
              height: "100%",
            })}
          >
            <BookCard.Cover
              sx={{
                borderRadius: "0.4rem",
                width: "100%",
                height: "70%",
                objectFit: "cover",
              }}
            ></BookCard.Cover>
          </BookCard>
        </Grid>
        <Grid size={8.5}>
          <Stack spacing={4}>
            <BookDetails book={book} />
            <BookReviews book={book} />
          </Stack>
        </Grid>
      </Grid>
    </PageContainer>
  );
}
