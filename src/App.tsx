import { Route, Routes } from "react-router-dom";
import "./index.css";
import PrivateRoute from "./features/user/PrivateRoute";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import BookPage from "./pages/Book/BookPage.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";
import Landing from "./pages/Landing/Landing.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material";
import theme from "./common/config/theme.js";
import UserProvider from "./features/user/UserProvider";
import BookshelfPage from "./pages/Bookshelf/BookshelfPage";

const queryClient = new QueryClient();

export default function App() {
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="" element={<Landing />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="/home" element={<HomePage />} />
              <Route path="/my-bookshelves" element={<BookshelfPage />} />
              <Route path="/books/:id" element={<BookPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </QueryClientProvider>
      </ThemeProvider>
    </UserProvider>
  );
}
