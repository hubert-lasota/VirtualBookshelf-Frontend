import css from "./input.module.css";
import useMessageResolver from "../../../features/message/useMessageResolver.js";

export default function Label({
  showAsterisk = false,
  showOptional = false,
  children,
  className = "",
  ...restProps
}) {
  const messageResolver = useMessageResolver("Label");

  return (
    <label className={`${css["label"]} ${className}`} {...restProps}>
      {children}
      {showAsterisk && <span className={css["asterisk-label"]}>{" *"}</span>}
      {showOptional && <span> {messageResolver("optional")}</span>}
    </label>
  );
}
