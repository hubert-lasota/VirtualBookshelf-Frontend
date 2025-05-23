import css from "./button.module.css";
import { BUTTON_VARIANTS } from "./buttonConfig.js";
import { COLORS } from "../../config/colorConfig.js";

export default function Button({
  // TODO tak samo w input
  variant = BUTTON_VARIANTS.CONTAINED,
  color = COLORS.PRIMARY,
  component: Component = "button",
  isLoading = false,
  children,
  className = "",
  disabled = false,
  ...rest
}) {
  return (
    <Component
      className={`${css["button"]} ${css[color]} ${css[variant]} ${isLoading ? css["loading"] : ""} ${className} ${disabled ? "disabled" : ""}`}
      {...rest}
      disabled={disabled || isLoading}
    >
      {isLoading ? "Loading..." : children}
    </Component>
  );
}
