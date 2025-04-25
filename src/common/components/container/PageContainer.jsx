import css from "./page-container.module.css";

export default function PageContainer({ children, className, ...restProps }) {
  return (
    <div className={`${css["page-container"]} ${className}`} {...restProps}>
      {children}
    </div>
  );
}
