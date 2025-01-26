import { createPortal } from "react-dom";
import css from "./modal.module.css";

export default function Modal({ isOpen, onClose, children }) {
  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className={css["modal-background"]} onClick={onClose}>
      <div className={css["container"]}>{children}</div>
    </div>,
    document.getElementById("portal"),
  );
}
