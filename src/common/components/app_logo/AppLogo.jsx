import { PiBookOpenBold } from "react-icons/pi";
import useMessageResolver from "../../../features/message/useMessageResolver.js";
import css from "./app-logo.module.css";

export default function AppLogo() {
  const message = useMessageResolver("App");

  return (
    <div className={css["container"]}>
      <PiBookOpenBold className={css["icon"]} />
      <span className={css["text"]}>{message("name")}</span>
    </div>
  );
}
