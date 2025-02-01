import { useState } from "react";
import css from "./login.module.css";
import Button from "../../components/button/Button.jsx";
import Input from "../../components/input/Input.jsx";
import useMessageResolver from "../../features/message/useMessageResolver.js";

export default function LoginForm({ onLogin }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const message = useMessageResolver("Login:LoginForm");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <header className={css["form-header"]}>{message("header")}</header>
      <div className={css["form"]}>
        <Input
          name="username"
          type="text"
          placeholder={message("input:username:placeholder")}
          value={formData.username}
          onChange={handleChange}
          style={{ width: "100%" }}
        />
        <Input
          name="password"
          type="password"
          placeholder={message("input:password:placeholder")}
          value={formData.password}
          onChange={handleChange}
          style={{ width: "100%" }}
        />
        <div className={css["register-text"]}>
          {message("register:text")}
          <span className={css["register-link"]}>
            {message("register:link")}
          </span>
        </div>
        <Button
          style={{ width: "100%" }}
          onClick={() => onLogin(formData.username, formData.password)}
        >
          {message("button")}
        </Button>
      </div>
    </>
  );
}
