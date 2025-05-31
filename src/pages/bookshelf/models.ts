export type ShelfType = "all" | "toRead" | "reading" | "read";

export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  shelf: ShelfType;
  addedAt: number;
}

export const defaultBooks: Book[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    coverUrl:
      "https://images.pexels.com/photos/1907785/pexels-photo-1907785.jpeg?auto=compress&cs=tinysrgb&w=300",
    shelf: "read",
    addedAt: Date.now() - 1000000,
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    coverUrl:
      "https://images.pexels.com/photos/694740/pexels-photo-694740.jpeg?auto=compress&cs=tinysrgb&w=300",
    shelf: "read",
    addedAt: Date.now() - 2000000,
  },
  {
    id: "3",
    title: "1984",
    author: "George Orwell",
    coverUrl:
      "https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=300",
    shelf: "toRead",
    addedAt: Date.now() - 3000000,
  },
  {
    id: "4",
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    coverUrl:
      "https://images.pexels.com/photos/3646105/pexels-photo-3646105.jpeg?auto=compress&cs=tinysrgb&w=300",
    shelf: "reading",
    addedAt: Date.now() - 4000000,
  },
];
