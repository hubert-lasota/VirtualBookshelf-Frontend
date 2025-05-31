import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { ShelfType } from "./models";
import { useBooks } from "./context";

interface BookFormProps {
  open: boolean;
  onClose: () => void;
}

const defaultCoverUrl =
  "https://images.pexels.com/photos/1005324/literature-book-open-pages-1005324.jpeg?auto=compress&cs=tinysrgb&w=300";

export const BookForm: React.FC<BookFormProps> = ({ open, onClose }) => {
  const { addBook } = useBooks();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [coverUrl, setCoverUrl] = useState("");
  const [shelf, setShelf] = useState<ShelfType>("toRead");

  const handleShelfChange = (event: SelectChangeEvent) => {
    setShelf(event.target.value as ShelfType);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    addBook({
      title,
      author,
      coverUrl: coverUrl || defaultCoverUrl,
      shelf,
    });

    // Reset form and close dialog
    setTitle("");
    setAuthor("");
    setCoverUrl("");
    setShelf("toRead");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add New Book</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <TextField
              label="Author"
              variant="outlined"
              fullWidth
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />

            <TextField
              label="Cover Image URL"
              variant="outlined"
              fullWidth
              placeholder="Leave empty for default cover"
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              helperText="Optional: Enter a URL for the book cover image"
            />

            <FormControl fullWidth>
              <InputLabel id="shelf-select-label">Shelf</InputLabel>
              <Select
                labelId="shelf-select-label"
                value={shelf}
                label="Shelf"
                onChange={handleShelfChange}
              >
                <MenuItem value="toRead">To Read</MenuItem>
                <MenuItem value="reading">Currently Reading</MenuItem>
                <MenuItem value="read">Read</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Add Book
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
