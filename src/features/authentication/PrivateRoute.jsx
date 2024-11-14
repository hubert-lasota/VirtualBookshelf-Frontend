import { Outlet, useNavigate } from "react-router-dom";
import useValidateJwt from "./api/useValidateJwt";
import Loading from "../../components/Loading";

export default function PrivateRoute() {
  const {isValid, loading} = useValidateJwt();
  const navigate = useNavigate();

  if(loading) {
    return <Loading />;
  }

  if (!isValid) {
    navigate("/login");
  }

  return <Outlet />;
}
