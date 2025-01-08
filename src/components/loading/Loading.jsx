import css from "./loading.module.css";

export default function Loading({ variant = "component" }) {
  return <div className={`${css[variant]} ${css["loading"]}`}>Loading...</div>;
}
