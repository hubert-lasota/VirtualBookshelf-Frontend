import useLogin from "../../features/auth/useLogin";
import css from "./login.module.css";
import BookShowcase from "./BookShowcase.jsx";
import LoginForm from "./LoginForm";
import useMessageResolver from "../../features/message/useMessageResolver.js";
import LoadingPage from "../loading/LoadingPage.jsx";

export default function Login() {
  const { error, isLoading, login } = useLogin();
  const message = useMessageResolver("Login");

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className={css["login"]}>
      <div className={css["left-column"]}>
        <BookShowcase />
      </div>
      <div className={css["right-column"]}>
        <LoginForm onLogin={login} />
        {error && <div className={css["login-error"]}>{message("error")}</div>}
      </div>
    </div>
  );
}
