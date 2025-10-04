export type GenreResponse = {
  id: number;
  name: string;
  totalBooks: number;
};

export type GenreFilter = { query?: string; availableInBookshelf?: boolean };
