import { Route, Routes } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContextProvider";
import "./css/accent-global.css";
import "./css/background-global.css";
import "./css/border-global.css";
import "./css/font-global.css";
import "./css/global.css";
import PrivateRoute from "./features/auth/PrivateRoute";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import BookPage from "./pages/book/BookPage.jsx";
import NotFound from "./pages/not_found/NotFound.jsx";
import UserPreferencesContextProvider from "./contexts/UserPreferencesContextProvider.jsx";

function App() {
  return (
    <AuthContextProvider>
      <UserPreferencesContextProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/book/:id" element={<BookPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserPreferencesContextProvider>
    </AuthContextProvider>
  );
}

export default App;
