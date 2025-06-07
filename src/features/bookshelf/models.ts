import { Book } from "../book/models";

export type BookshelfBookNote = {
  content: string;
  startPage: number;
  endPage: number;
};

export type BookshelfBook = {
  id: number;
  book: Book;
  notes: BookshelfBookNote[];
};

export type BookshelfBookWithId = BookshelfBook & { bookshelfId: number };

export type Bookshelf = {
  id: number;
  name: string;
  description?: string;
  books: BookshelfBook[];
};
