import { Outlet, useNavigate } from "react-router-dom";
import useValidateJwt from "./useValidateJwt";
import { useEffect } from "react";
import LoadingPage from "../../pages/loading/LoadingPage.jsx";

export default function PrivateRoute() {
  const { isValid, isLoading } = useValidateJwt();
  const navigate = useNavigate();

  useEffect(() => {
    if (isValid === false) {
      navigate("/login");
    }
  }, [isValid, navigate]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return <Outlet />;
}
