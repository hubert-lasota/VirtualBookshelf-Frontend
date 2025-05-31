import { Route, Routes } from "react-router-dom";
import "./index.css";
import PrivateRoute from "./features/user/PrivateRoute";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import BookPage from "./pages/book/BookPage.jsx";
import NotFound from "./pages/not_found/NotFound.jsx";
import Landing from "./pages/landing/Landing.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material";
import theme from "./common/config/theme.js";
import UserContextProvider from "./features/user/UserContextProvider";
import { BookshelfPage } from "./pages/bookshelf/BookshelfPage";

const queryClient = new QueryClient();

export default function App() {
  return (
    <UserContextProvider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route element={<PrivateRoute />}>
              <Route path="/home" element={<Home />} />
              <Route path="my-bookshelf" element={<BookshelfPage />} />
              <Route path="/books/:id" element={<BookPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </QueryClientProvider>
      </ThemeProvider>
    </UserContextProvider>
  );
}
