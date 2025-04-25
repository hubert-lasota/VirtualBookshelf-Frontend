import { useEffect, useState } from "react";
import css from "./toast.module.css";
import { MdOutlineErrorOutline } from "react-icons/md";
import { IoCheckmarkCircleOutline, IoWarningOutline } from "react-icons/io5";
import { TOAST_TYPES } from "./config.js";

const { SUCCESS, ERROR, WARNING } = TOAST_TYPES;

function getStartIconByType(type) {
  switch (type) {
    case SUCCESS:
      return IoCheckmarkCircleOutline;
    case WARNING:
      return IoWarningOutline;
    case ERROR:
      return MdOutlineErrorOutline;
    default:
      throw new Error(`Cannot get start icon. Unknown type ${type}`);
  }
}

export default function Toast({ message, type, duration = 3000, onClose }) {
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHiding(true);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const StartIcon = getStartIconByType(type);
  return (
    <div className={css["page-position"]}>
      <div className={css["container"]}>
        <StartIcon />
        <p>{message}</p>
      </div>
    </div>
  );
}
