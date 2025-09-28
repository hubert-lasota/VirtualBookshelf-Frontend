import { ReadingSessionResponse } from "../../../../../../common/models/readingSessionModels";
import { createContext, useContext } from "react";

type ManageSessionsContextValue = {
  onEditSession: (session: ReadingSessionResponse) => void;
};

export const ManageSessionsContext =
  createContext<ManageSessionsContextValue | null>(null);

export const useManageSessionsContext = () => {
  const context = useContext(ManageSessionsContext);
  if (!context) {
    throw new Error(
      "useManageSessionsContext must be used within ManageSessionsContext",
    );
  }
  return context;
};
