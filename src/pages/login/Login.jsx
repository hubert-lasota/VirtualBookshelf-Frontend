import Loading from "../../components/Loading";
import useLogin from "../../features/authentication/api/useLogin";
import css from "./login.module.css";
import LoginBookShowcase from "./LoginBookShowcase";
import LoginForm from "./LoginForm";

export default function Login() {
  const { error, loading, login } = useLogin();

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={css["page"]}>
      <div className={css["left-column"]}>
        <LoginBookShowcase />
      </div>
      <div className={css["right-column"]}>
        <LoginForm onLogin={login} />
        {error && <div className={css["login-error"]}>Invalid credentials. Try again.</div>}
      </div>
    </div>
  );
}
