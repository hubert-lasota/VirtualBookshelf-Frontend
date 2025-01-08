import { Outlet, useNavigate } from "react-router-dom";
import useValidateJwt from "./useValidateJwt";
import Loading from "../../components/loading/Loading.jsx";
import { useEffect } from "react";

export default function PrivateRoute() {
  const { isValid, isLoading } = useValidateJwt();
  const navigate = useNavigate();

  useEffect(() => {
    if (isValid === false) {
      navigate("/login");
    }
  }, [isValid, navigate]);

  if (isLoading) {
    return <Loading />;
  }

  return <Outlet />;
}
