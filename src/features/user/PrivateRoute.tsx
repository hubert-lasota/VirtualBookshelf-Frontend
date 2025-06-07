import { Outlet, useNavigate } from "react-router-dom";
import LoadingPage from "../../common/components/loading/LoadingPage.js";
import { useVerifyJwtValidity } from "./authClient";
import { useUserContext } from "./UserContext";

export default function PrivateRoute() {
  const { user } = useUserContext();

  const { data: { isValid } = {}, isLoading } = useVerifyJwtValidity(user.jwt);
  const navigate = useNavigate();

  if (isLoading) {
    return <LoadingPage />;
  }
  console.log("isValid", isValid);
  if (!isValid) {
    navigate("/login");
    return null;
  }

  return <Outlet />;
}
