import { Outlet, useNavigate } from "react-router-dom";
import { useVerifyJwtValidity } from "../api/authClient";
import { useUserContext } from "./UserContext";
import LoadingPage from "../components/ui/Loading/LoadingPage";

export default function PrivateRoute() {
  const { user } = useUserContext();

  const { data: { isValid } = {}, isLoading } = useVerifyJwtValidity(user.jwt);
  const navigate = useNavigate();

  if (isLoading) {
    return <LoadingPage />;
  }

  if (!isValid) {
    navigate("/login");
    return null;
  }

  return <Outlet />;
}
