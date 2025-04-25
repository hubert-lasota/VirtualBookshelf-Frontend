import { createContext, useContext } from "react";

export const BookContext = createContext(null);

export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("BookContext must be used within BookContextProvider.");
  }
  return context;
};
