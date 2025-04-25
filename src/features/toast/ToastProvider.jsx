import { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import Toast from "./Toast.jsx";
import { ToastContext } from "./useToastContext.js";
import { TOAST_TYPES } from "./config.js";

const { SUCCESS, ERROR, WARNING, INFO } = TOAST_TYPES;
const DEFAULT_DURATION_TIME = 3000;

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type, duration) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, duration }]);
  }, []);

  const showSuccessToast = useCallback(
    (message, duration = DEFAULT_DURATION_TIME) =>
      showToast(message, SUCCESS, duration),
    [showToast],
  );

  const showErrorToast = useCallback(
    (message, duration = DEFAULT_DURATION_TIME) =>
      showToast(message, ERROR, duration),
    [showToast],
  );

  const showWarningToast = useCallback(
    (message, duration = DEFAULT_DURATION_TIME) =>
      showToast(message, WARNING, duration),
    [showToast],
  );

  const showInfoToast = useCallback(
    (message, duration = DEFAULT_DURATION_TIME) =>
      showToast(message, INFO, duration),
    [showToast],
  );

  return (
    <ToastContext.Provider
      value={{
        showToast,
        showSuccessToast,
        showErrorToast,
        showWarningToast,
        showInfoToast,
      }}
    >
      {children}
      {createPortal(
        toasts.map(({ id, ...toastProps }) => (
          <Toast
            key={id}
            {...toastProps}
            onClose={() => setToasts((prev) => prev.filter((t) => t.id !== id))}
          />
        )),
        document.getElementById("toast"),
      )}
    </ToastContext.Provider>
  );
}
