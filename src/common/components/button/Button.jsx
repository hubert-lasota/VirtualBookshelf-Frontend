import css from "./button.module.css";
import { BUTTON_VARIANTS } from "./buttonConfig.js";
import { COLORS } from "../../config/colorConfig.js";

export default function Button({
  // TODO tak samo w input
  variant = BUTTON_VARIANTS.CONTAINED,
  color = COLORS.PRIMARY,
  component: Component = "button",
  children,
  className = "",
  ...rest
}) {
  return (
    <Component
      className={`${css["button"]} ${css[color]} ${css[variant]} ${className}`}
      {...rest}
    >
      {children}
    </Component>
  );
}
