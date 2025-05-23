import { FaUser } from "react-icons/fa";
import useMessageResolver from "../../../features/message/useMessageResolver.js";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useState } from "react";

const iconSize = "1.4rem";

const iconStyle = { cursor: "pointer", fontSize: iconSize };

export default function useFormFields() {
  const messageResolver = useMessageResolver("Login:LoginForm");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleClickPasswordIcon = (e, value) => {
    e.stopPropagation();
    setIsPasswordVisible(value);
  };

  return [
    {
      name: "username",
      constraints: {
        required: "Username is required",
      },
      props: {
        label: messageResolver("input:username:placeholder"),
        endIcon: <FaUser style={{ fontSize: iconSize }} />,
      },
    },
    {
      name: "password",
      constraints: {
        required: "Password is required",
      },
      props: {
        label: messageResolver("input:password:placeholder"),
        endIcon: isPasswordVisible ? (
          <MdVisibilityOff
            onClick={(e) => handleClickPasswordIcon(e, false)}
            style={iconStyle}
          />
        ) : (
          <MdVisibility
            onClick={(e) => handleClickPasswordIcon(e, true)}
            style={iconStyle}
          />
        ),
        type: isPasswordVisible ? "text" : "password",
      },
    },
  ];
}
