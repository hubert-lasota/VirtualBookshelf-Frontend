import { Outlet, useNavigate } from "react-router-dom";
import useValidateJwt from "./useValidateJwt";
import Loading from "../../components/Loading";

export default function PrivateRoute() {
  const {isValid, isLoading} = useValidateJwt();
  const navigate = useNavigate();

  if(isLoading) {
    return <Loading />;
  }

  if (!isValid) {
    navigate("/login");
  }

  return <Outlet />;
}
