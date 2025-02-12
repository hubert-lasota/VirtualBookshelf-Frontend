import css from "./header.module.css";
import useMessageResolver from "../../features/message/useMessageResolver.js";
import { useEffect, useRef, useState } from "react";

const FIXED_STYLES = {
  position: "fixed",
  top: "0",
  borderTop: "0",
  zIndex: "99999",
  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
};

export default function GlobalNavHeader({ renderFixed = false }) {
  const [isFixed, setIsFixed] = useState(false);
  const message = useMessageResolver("App");
  const headerRef = useRef(null);

  useEffect(() => {
    if (renderFixed) return;
    const element = headerRef?.current;
    if (!element) return;

    const handleCheckIsElementVisible = () => {
      const rect = element.getBoundingClientRect();
      const scrollHeight = window.scrollY;

      const height = isFixed ? rect.height : rect.height + rect.top;
      if (scrollHeight > height) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    document.addEventListener("scroll", handleCheckIsElementVisible);

    return () =>
      document.removeEventListener("scroll", handleCheckIsElementVisible);
  }, [headerRef, renderFixed]);

  return (
    <header
      ref={headerRef}
      className={css["header"]}
      style={isFixed || renderFixed ? FIXED_STYLES : undefined}
    >
      <h2 className={css["app-name"]}>{message("name")}</h2>
      <div></div>
    </header>
  );
}
