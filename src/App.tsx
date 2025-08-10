import { Route, Routes } from "react-router-dom";
import "./index.css";
import LoginPage from "./pages/Login/LoginPage";
import NotFound from "./pages/NotFound/NotFound.jsx";
import Landing from "./pages/Landing/Landing.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material";
import theme from "./common/config/theme.js";
import UserProvider from "./common/auth/UserProvider";
import { SnackbarProvider } from "notistack";
import SnackbarAdapter from "./common/components/ui/Snackbar/SnackbarAdapter";
import LoggedInViewContainer from "./views/LoggedInViewContainer/LoggedInViewContainer";
import HomeView from "./views/Home/HomeView";
import BookshelfView from "./views/Bookshelf/BookshelfView";
import BookView from "./views/Book/BookView";
import ChallengeView from "./views/Challenge/ChallengeView";

const queryClient = new QueryClient();

export default function App() {
  return (
    <UserProvider>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          autoHideDuration={2000}
          Components={{
            success: SnackbarAdapter,
            info: SnackbarAdapter,
            warning: SnackbarAdapter,
            error: SnackbarAdapter,
          }}
        >
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="" element={<Landing />} />
              <Route path="/login" element={<LoginPage />} />
              <Route element={<LoggedInViewContainer />}>
                <Route path="/home" element={<HomeView />} />
                <Route path="/my-bookshelves" element={<BookshelfView />} />
                <Route path="/challenges" element={<ChallengeView />} />
                <Route path="/books/:id" element={<BookView />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </QueryClientProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </UserProvider>
  );
}
