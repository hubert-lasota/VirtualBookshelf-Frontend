import { useState } from "react";
import css from "./login.module.css";

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      <header className={css["form-header"]}>Sign in</header>
      <div className={css["form"]}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <div className={css["register-text"]}>
          Not a member? <span className={css["register-link"]}>Register now</span>
        </div>
        <button className={css["submit-btn"]} onClick={() => onLogin(username, password)}>
          Submit
        </button>
      </div>
    </>
  );
}
