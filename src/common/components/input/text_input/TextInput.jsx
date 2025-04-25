import css from "./text-input.module.css";
import { useRef } from "react";
import { COLORS } from "../../../config/colorConfig.js";

export default function TextInput({
  color = COLORS.PRIMARY,
  startIcon = null,
  endIcon = null,
  containerStyle = null,
  ...inputProps
}) {
  const inputRef = useRef(null);

  const clickContainer = () => {
    if (!inputRef?.current) return;
    inputRef.current.focus();
  };

  return (
    <div
      style={containerStyle}
      className={`${css["container"]} ${css[color]}`}
      onClick={clickContainer}
    >
      {startIcon && <div className={css[["start-icon"]]}>{startIcon}</div>}
      <input ref={inputRef} className={`${css["input"]}`} {...inputProps} />
      {endIcon && <div className={css[["end-icon"]]}>{endIcon}</div>}
    </div>
  );
}
