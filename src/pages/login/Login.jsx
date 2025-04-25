import css from "./login.module.css";
import BookShowcase from "./BookShowcase.jsx";
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <div className={css["login"]}>
      <div className={css["left-column"]}>
        <BookShowcase />
      </div>
      <div className={css["right-column"]}>
        <LoginForm />
      </div>
    </div>
  );
}
