import { Route, Routes } from "react-router-dom";
import AuthenticationContextProvider from "./contexts/AuthenticationContextProvider";
import "./css/global.css";
import Login from "./pages/login/Login";
import PrivateRoute from "./features/authentication/PrivateRoute";
import Home from "./pages/home/Home";

function App() {
  return (
    <AuthenticationContextProvider>
      <Routes>
        <Route path="/" element={<Login /> } />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute/>}>
          <Route path="/home" element={<Home />}/>
        </Route>
      </Routes>
    </AuthenticationContextProvider>
  );
}

export default App;
