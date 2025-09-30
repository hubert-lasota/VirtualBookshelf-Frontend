import { createContext, useContext } from "react";

type DialogContextValue = {
  onClose: () => void;
};

export const DialogContext = createContext<DialogContextValue | null>(null);

export const useDialogContext = () => {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error("DialogContext must be used within DialogProvider.");
  }
  return context;
};
