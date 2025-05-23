import { Outlet, useNavigate } from "react-router-dom";
import LoadingPage from "../../pages/loading/LoadingPage.jsx";
import { useVerifyJwtValidity } from "./authClient.js";
import { useAuthContext } from "./AuthContext.js";

export default function PrivateRoute() {
  const { jwt } = useAuthContext();
  console.log("jwt", jwt);
  const { data: { isValid } = {}, isLoading } = useVerifyJwtValidity(jwt);
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
