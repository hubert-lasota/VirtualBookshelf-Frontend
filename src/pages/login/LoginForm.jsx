import { useState } from "react";
import css from "./login.module.css";
import Button from "../../common/components/button/Button.jsx";
import TextInput from "../../common/components/input/text_input/TextInput.jsx";
import useMessageResolver from "../../features/message/useMessageResolver.js";
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import useLogin from "../../features/auth/services/useLogin.js";
import LoadingPage from "../loading/LoadingPage.jsx";

export default function LoginForm() {
  const { error, isLoading, login } = useLogin();
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({ username: "", password: "" });
  const message = useMessageResolver("Login:LoginForm");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    if (!formData.username || !formData.password) isValid = false;
    if (isValid) {
      login(formData.username, formData.password);
    } else {
      setErrorMessage(message("submit:invalid"));
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <form onSubmit={handleSubmit} className={css["form"]}>
      <header className={css["form-header"]}>{message("header")}</header>
      <div className={css["form-fields"]}>
        <TextInput
          name="username"
          type="text"
          placeholder={message("input:username:placeholder")}
          value={formData.username}
          onChange={handleChange}
          endIcon={<FaUser className={css["field-icon"]} />}
        />
        <TextInput
          name="password"
          type="password"
          placeholder={message("input:password:placeholder")}
          value={formData.password}
          onChange={handleChange}
          endIcon={<RiLockPasswordFill className={css["field-icon"]} />}
        />
        <div className={css["register-text"]}>
          {message("register:text")}
          <span className={css["register-link"]}>
            {" " + message("register:link")}
          </span>
        </div>
      </div>
      <Button
        className={css["submit-btn"]}
        onClick={handleSubmit}
        type="submit"
      >
        {message("button")}
      </Button>
      {error ||
        (errorMessage && (
          <div className={css["login-error"]}>
            {errorMessage || message("error")}
          </div>
        ))}
    </form>
  );
}
