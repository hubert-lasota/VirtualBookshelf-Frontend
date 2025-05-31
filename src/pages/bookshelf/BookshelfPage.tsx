import React, { useState } from "react";
import { Box, Fab, useTheme } from "@mui/material";
import { Plus } from "lucide-react";
import { Navbar } from "./Navbar";
import { BookShelf } from "./Bookshelf";
import { BookForm } from "./BookForm";
import { BookProvider } from "./context";

interface HomeProps {
  toggleTheme: () => void;
  mode: "light" | "dark";
}

export const BookshelfPage: React.FC<HomeProps> = ({ toggleTheme, mode }) => {
  const [isAddBookOpen, setIsAddBookOpen] = useState(false);
  const theme = useTheme();

  const handleOpenAddBook = () => {
    setIsAddBookOpen(true);
  };

  const handleCloseAddBook = () => {
    setIsAddBookOpen(false);
  };

  return (
    <BookProvider>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          bgcolor: "background.default",
        }}
      >
        <Navbar toggleTheme={toggleTheme} mode={mode} />

        <Box component="main" sx={{ flexGrow: 1 }}>
          <BookShelf />
        </Box>

        <Fab
          color="secondary"
          aria-label="add book"
          onClick={handleOpenAddBook}
          sx={{
            position: "fixed",
            bottom: theme.spacing(4),
            right: theme.spacing(4),
          }}
        >
          <Plus />
        </Fab>

        <BookForm open={isAddBookOpen} onClose={handleCloseAddBook} />
      </Box>
    </BookProvider>
  );
};
