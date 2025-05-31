import React from "react";
import { Grid, Box, Typography, Paper } from "@mui/material";
import { BookCard } from "./BookCard";
import { useBooks } from "./context";

export const BookShelf: React.FC = () => {
  const { filteredBooks, currentShelf } = useBooks();

  const getShelfTitle = () => {
    switch (currentShelf) {
      case "toRead":
        return "To Read";
      case "reading":
        return "Currently Reading";
      case "read":
        return "Read";
      default:
        return "All Books";
    }
  };

  // @ts-ignore
  // @ts-ignore
  return (
    <Box sx={{ p: 3 }}>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ mb: 3, fontWeight: "medium" }}
      >
        {getShelfTitle()}
      </Typography>

      {filteredBooks.length === 0 ? (
        <Paper
          elevation={2}
          sx={{
            p: 4,
            textAlign: "center",
            backgroundColor: "background.paper",
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" color="text.secondary">
            No books in this shelf yet
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
            Add some books to get started!
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredBooks.map((book) => (
            // @ts-ignore
            <Grid item key={book.id} xs={12} sm={6} md={4} lg={3} xl={2}>
              <BookCard book={book} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};
