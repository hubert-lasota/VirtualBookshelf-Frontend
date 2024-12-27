import css from "./input.module.css";

export default function Input({
  name = "",
  type = "text",
  placeholder = "",
  color = "primary",
  value,
  onChange,
  style = {},
}) {
  return (
    <input
      style={style}
      name={name}
      type={type}
      placeholder={placeholder}
      className={`${css["input"]} ${css[color]}`}
      value={value}
      onChange={onChange}
    />
  );
}
