import { Route, Routes } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContextProvider";
import "./css/global.css";
import PrivateRoute from "./features/auth/PrivateRoute";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
