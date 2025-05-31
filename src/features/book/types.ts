import { Author } from "../author/types";

type Publisher = {
  id: number;
  name: string;
};

type BookFormat = {
  id: number;
  name: string;
};

type Genre = {
  id: number;
  name: string;
};

type BookSeries = {
  id: number;
  name: string;
  bookOrder: number;
};

export type Book = {
  id: number;
  title: string;
  isbn: string;
  authors: Pick<Author, "id" | "fullName">[];
  publishers: Publisher[];
  format: BookFormat;
  genres: Genre[];
  series: BookSeries[];
  publicationYear: number;
  languageTag: string;
  coverUrl: string;
  pageCount: number;
  description?: string;
};
