import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Book, ShelfType, defaultBooks } from "./models";

interface BookContextType {
  books: Book[];
  filteredBooks: Book[];
  searchTerm: string;
  currentShelf: ShelfType;
  addBook: (book: Omit<Book, "id" | "addedAt">) => void;
  updateBookShelf: (id: string, shelf: ShelfType) => void;
  removeBook: (id: string) => void;
  setSearchTerm: (term: string) => void;
  setCurrentShelf: (shelf: ShelfType) => void;
}

const BookContext = createContext<BookContextType | undefined>(undefined);

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBooks must be used within a BookProvider");
  }
  return context;
};

interface BookProviderProps {
  children: ReactNode;
}

export const BookProvider: React.FC<BookProviderProps> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>(() => {
    const savedBooks = localStorage.getItem("books");
    return savedBooks ? JSON.parse(savedBooks) : defaultBooks;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [currentShelf, setCurrentShelf] = useState<ShelfType>("all");
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));

    let filtered = books;

    // Filter by shelf
    if (currentShelf !== "all") {
      filtered = filtered.filter((book) => book.shelf === currentShelf);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(term) ||
          book.author.toLowerCase().includes(term),
      );
    }

    // Sort by recently added
    filtered = [...filtered].sort((a, b) => b.addedAt - a.addedAt);

    setFilteredBooks(filtered);
  }, [books, searchTerm, currentShelf]);

  const addBook = (bookData: Omit<Book, "id" | "addedAt">) => {
    const newBook: Book = {
      ...bookData,
      id: Date.now().toString(),
      addedAt: Date.now(),
    };
    setBooks((prevBooks) => [...prevBooks, newBook]);
  };

  const updateBookShelf = (id: string, shelf: ShelfType) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.id === id ? { ...book, shelf } : book)),
    );
  };

  const removeBook = (id: string) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
  };

  return (
    <BookContext.Provider
      value={{
        books,
        filteredBooks,
        searchTerm,
        currentShelf,
        addBook,
        updateBookShelf,
        removeBook,
        setSearchTerm,
        setCurrentShelf,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
