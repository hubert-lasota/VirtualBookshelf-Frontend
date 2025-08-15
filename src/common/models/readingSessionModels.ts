import { BookResponse } from "./bookModels";

export type ReadingSessionResponse = {
  id: number;
  pageFrom: number;
  pageTo: number;
  startedReadingAt: string;
  finishedReadingAt: string;
  book: BookResponse;
};
