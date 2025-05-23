import { Route, Routes } from "react-router-dom";
import AuthContextProvider from "./features/auth/AuthContextProvider.jsx";
import "./common/css/global.css";
import PrivateRoute from "./features/auth/PrivateRoute";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import BookPage from "./pages/book/BookPage.jsx";
import NotFound from "./pages/not_found/NotFound.jsx";
import UserPreferencesContextProvider from "./common/contexts/UserPreferencesContextProvider.jsx";
import Landing from "./pages/landing/Landing.jsx";
import ToastProvider from "./features/toast/ToastProvider.jsx";

function App() {
  return (
    <AuthContextProvider>
      <UserPreferencesContextProvider>
        <ToastProvider>
          <Routes>
            <Route path="" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path="/book/:id" element={<BookPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ToastProvider>
      </UserPreferencesContextProvider>
    </AuthContextProvider>
  );
}

export default App;
