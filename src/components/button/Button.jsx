import css from "./button.module.css";

export default function Button({
  variant = "contained",
  color = "primary",
  children,
  style = {},
  className = "",
  onClick = () => {},
}) {
  return (
    <button
      className={`${css["button"]} ${css[color]} ${css[variant]} ${className}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
