import React, { useState } from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Tooltip,
} from "@mui/material";

import {
  BookOpen,
  BookMarked,
  BookCheck,
  MoreVertical,
  Trash2,
} from "lucide-react";
import { Book, ShelfType } from "./models";
import { useBooks } from "./context";

interface BookCardProps {
  book: Book;
}

const shelfIcons = {
  toRead: <BookMarked size={18} />,
  reading: <BookOpen size={18} />,
  read: <BookCheck size={18} />,
};

const shelfLabels = {
  toRead: "To Read",
  reading: "Currently Reading",
  read: "Read",
};

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { updateBookShelf, removeBook } = useBooks();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleChangeShelf = (shelf: ShelfType) => {
    updateBookShelf(book.id, shelf);
    handleCloseMenu();
  };

  const handleRemoveBook = () => {
    removeBook(book.id);
    handleCloseMenu();
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        maxWidth: 250,
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={book.coverUrl}
        alt={`Cover of ${book.title}`}
        sx={{ objectFit: "cover" }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          noWrap
          title={book.title}
        >
          {book.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          noWrap
          title={book.author}
        >
          {book.author}
        </Typography>
        <Box sx={{ mt: 1, display: "flex", alignItems: "center", gap: 0.5 }}>
          {book.shelf !== "all" && (
            <Tooltip title={shelfLabels[book.shelf]}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "primary.main",
                }}
              >
                {shelfIcons[book.shelf]}
              </Box>
            </Tooltip>
          )}
        </Box>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="more options"
          aria-controls={open ? "book-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleOpenMenu}
        >
          <MoreVertical size={20} />
        </IconButton>
        <Menu
          id="book-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleCloseMenu}
          MenuListProps={{
            "aria-labelledby": "more-button",
          }}
        >
          <MenuItem
            onClick={() => handleChangeShelf("toRead")}
            disabled={book.shelf === "toRead"}
            sx={{ gap: 1 }}
          >
            <BookMarked size={18} /> Add to "To Read"
          </MenuItem>
          <MenuItem
            onClick={() => handleChangeShelf("reading")}
            disabled={book.shelf === "reading"}
            sx={{ gap: 1 }}
          >
            <BookOpen size={18} /> Move to "Currently Reading"
          </MenuItem>
          <MenuItem
            onClick={() => handleChangeShelf("read")}
            disabled={book.shelf === "read"}
            sx={{ gap: 1 }}
          >
            <BookCheck size={18} /> Mark as "Read"
          </MenuItem>
          <MenuItem
            onClick={handleRemoveBook}
            sx={{ color: "error.main", gap: 1 }}
          >
            <Trash2 size={18} /> Remove Book
          </MenuItem>
        </Menu>
      </CardActions>
    </Card>
  );
};
