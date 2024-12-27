import { useState } from "react";
import css from "./login.module.css";
import Button from "../../components/button/Button.jsx";
import Input from "../../components/input/Input.jsx";

export default function LoginForm({ onLogin }) {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <header className={css["form-header"]}>Zaloguj się</header>
      <div className={css["form"]}>
        <Input
          name="username"
          type="text"
          placeholder="Nazwa użytkownika"
          value={formData.username}
          onChange={handleChange}
          style={{ width: "100%" }}
        />
        <Input
          name="password"
          type="password"
          placeholder="Hasło"
          value={formData.password}
          onChange={handleChange}
          style={{ width: "100%" }}
        />
        <div className={css["register-text"]}>
          Nie jesteś członkiem?{" "}
          <span className={css["register-link"]}>Zarejestruj się teraz</span>
        </div>
        <Button
          style={{ width: "100%" }}
          onClick={() => onLogin(formData.username, formData.password)}
        >
          Zaloguj się
        </Button>
      </div>
    </>
  );
}
