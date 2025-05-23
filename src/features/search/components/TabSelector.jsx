import css from "./search.module.css";
import { useRef } from "react";
import useMessageResolver from "../../message/useMessageResolver.js";

export default function TabSelector({ selectedTab, onTabChange }) {
  const containerRef = useRef(null);
  const message = useMessageResolver("Home:Header:SearchModal:TabSelector");

  const clickTab = (e, tab) => {
    if (!containerRef.current) return;
    const className = css["tab-active"];
    const childrenArr = Array.from(containerRef.current.children);
    childrenArr.forEach((child) => child.classList.remove(className));
    e.target.classList.add(className);
    onTabChange(tab.name);
  };

  const tabs = [
    { name: "all", label: message("tab:all") },
    { name: "title", label: message("tab:title") },
    { name: "author", label: message("tab:author") },
  ];

  return (
    <div className={css["tab-container"]} ref={containerRef}>
      {tabs.map((tab) => (
        <span
          key={tab.name}
          className={`${css["tab"]} ${selectedTab === tab.name ? css["tab-active"] : ""}`}
          data-tab-name={tab.name}
          onClick={(e) => clickTab(e, tab)}
        >
          {tab.label}
        </span>
      ))}
    </div>
  );
}
