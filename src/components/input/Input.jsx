import css from "./input.module.css";
import { useRef } from "react";

export default function Input({
  name = "",
  type = "text",
  placeholder = "",
  color = "primary",
  value,
  onChange,
  style = {},
  startIcon = null,
  endIcon = null,
}) {
  const inputRef = useRef(null);

  const clickContainer = () => {
    if (!inputRef?.current) return;
    inputRef.current.focus();
  };

  return (
    <div
      style={style}
      className={`${css["container"]}  ${css[color]}`}
      onClick={clickContainer}
    >
      {startIcon && <div className={css[["start-icon"]]}>{startIcon}</div>}
      <input
        ref={inputRef}
        className={`${css["input"]}`}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {endIcon && <div className={css[["end-icon"]]}>{endIcon}</div>}
    </div>
  );
}
