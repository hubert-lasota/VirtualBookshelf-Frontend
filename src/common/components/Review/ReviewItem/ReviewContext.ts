import { createContext, useContext } from "react";
import { ReviewResponse } from "../../../models/reviewModels";

export const ReviewContext = createContext<ReviewResponse | null>(null);

export function useReviewContext() {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error("ReviewContext must be used within ReviewContextProvider.");
  }
  return context;
}
