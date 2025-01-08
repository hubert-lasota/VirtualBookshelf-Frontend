import Loading from "../../components/loading/Loading.jsx";
import useLogin from "../../features/auth/useLogin";
import css from "./login.module.css";
import BookShowcase from "./BookShowcase.jsx";
import LoginForm from "./LoginForm";

export default function Login() {
  const { error, isLoading, login } = useLogin();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={css["login"]}>
      <div className={css["left-column"]}>
        <BookShowcase />
      </div>
      <div className={css["right-column"]}>
        <LoginForm onLogin={login} />
        {error && (
          <div className={css["login-error"]}>
            Niepoprawne dane uwierzytelniające. Spróbuj jeszcze raz.
          </div>
        )}
      </div>
    </div>
  );
}
