import { Outlet, useNavigate } from "react-router-dom";
import { useVerifyJwtValidity } from "../api/clients/authClient";
import { useUserContext } from "./UserContext";

// TODO do usunięcia
export default function PrivateRoute() {
  const { user } = useUserContext();

  const { data: { isValid } = {} } = useVerifyJwtValidity(user.jwt);
  const navigate = useNavigate();

  if (!isValid) {
    navigate("/login");
    return null;
  }

  return <Outlet />;
}
