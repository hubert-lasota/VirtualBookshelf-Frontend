import Loading from "../../components/Loading";
import useLogin from "../../features/auth/useLogin";
import css from "./login.module.css";
import LoginBookShowcase from "./LoginBookShowcase";
import LoginForm from "./LoginForm";

export default function Login() {
  const { error, isLoading, login } = useLogin();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={css["login"]}>
      <div className={css["left-column"]}>
        <LoginBookShowcase />
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
