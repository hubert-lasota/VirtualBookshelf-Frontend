import { createContext, useContext } from "react";

export const ToastContext = createContext(null);

export function useToastContext() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastContext must be used within ToastContextProvider");
  }
  return context;
}
