import { createContext, useContext } from "react";
import { AuthorDetailsResponse } from "../../common/models/authorModels";

export const AuthorDetailsContext = createContext<AuthorDetailsResponse | null>(
  null,
);

export function useAuthorDetailsContext() {
  const context = useContext(AuthorDetailsContext);
  if (!context) {
    throw new Error(
      "useAuthorDetailsContext must be used within AuthorDetailsContextProvider",
    );
  }
  return context;
}
