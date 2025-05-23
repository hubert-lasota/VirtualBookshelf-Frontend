import css from "./text-input.module.css";
import { useId, useRef } from "react";
import { COLORS } from "../../../config/colorConfig.js";
import Label from "../Label.jsx";

export default function TextInput({
  color = COLORS.PRIMARY,
  startIcon = null,
  endIcon = null,
  containerStyle = null,
  error = "",
  className = "",
  label = "",
  showAsterisk = false,
  showOptional = false,
  placeholder = "",
  ...inputProps
}) {
  const id = useId();
  const inputRef = useRef(null);

  const clickContainer = () => {
    if (!inputRef?.current) return;
    inputRef.current.focus();
  };

  return (
    <div>
      <Label
        htmlFor={id}
        showOptional={showOptional}
        showAsterisk={showAsterisk}
      >
        {label}
      </Label>
      <div
        style={containerStyle}
        className={`${css["container"]} ${css[color]}`}
        onClick={clickContainer}
      >
        {startIcon && <div className={css[["start-icon"]]}>{startIcon}</div>}
        <input
          id={id}
          ref={inputRef}
          type="text"
          className={`${css["input"]} ${className}`}
          placeholder={placeholder || label}
          {...inputProps}
        />
        {endIcon && <div className={css[["end-icon"]]}>{endIcon}</div>}
      </div>
      {/*TODO tutaj error (HelperText)*/}
    </div>
  );
}
