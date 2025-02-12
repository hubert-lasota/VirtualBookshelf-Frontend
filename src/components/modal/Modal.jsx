import { createPortal } from "react-dom";
import css from "./modal.module.css";
import { useEffect, useRef } from "react";

export default function Modal({ isOpen, onClose, children }) {
  const oldOverflowRef = useRef("");

  useEffect(() => {
    const style = document.body.style;
    if (!oldOverflowRef.current) {
      oldOverflowRef.current = style.overflow;
    }
    if (isOpen) {
      style.overflow = "hidden";
    } else {
      style.overflow = oldOverflowRef.current;
    }

    return () => {
      style.overflow = oldOverflowRef.current;
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return createPortal(
    <div className={css["modal-background"]} onClick={onClose}>
      <div className={css["container"]} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.getElementById("portal"),
  );
}
