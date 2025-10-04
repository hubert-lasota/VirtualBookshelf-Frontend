import { Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import LoginPage from "./pages/Login/LoginPage";
import NotFoundPage from "./pages/NotFound/NotFoundPage.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@mui/material";
import theme from "./common/config/theme.js";
import UserProvider from "./common/auth/UserProvider";
import { SnackbarProvider } from "notistack";
import SnackbarAdapter from "./common/components/Snackbar/SnackbarAdapter";
import LoggedInPageLayout from "./pages/LoggedInLayout/LoggedInPageLayout";
import HomePage from "./pages/Home/HomePage";
import BookshelfPage from "./pages/Bookshelf/BookshelfPage";
import BookPage from "./pages/Book/BookPage";
import ChallengePage from "./pages/Challenge/ChallengePage";
import AuthorPage from "./pages/Author/AuthorPage";
import SearchPage from "./pages/Search/SearchPage";
import StatisticsPage from "./pages/Statistics/StatisticsPage";
import GenrePage from "./pages/Genre/GenrePage";
import RecommendedBooksPage from "./pages/RecommendedBooks/RecommendedBooksPage";
import RecommendedAuthorsPage from "./pages/RecommendedAuthors/RecommendedAuthorsPage";
import RecommendedGenresPage from "./pages/RecommendedGenres/RecommendedGenresPage";

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
              <Route path="" element={<Navigate to="/login" />} />
              <Route path="/login" element={<LoginPage />} />
              <Route element={<LoggedInPageLayout />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/bookshelves" element={<BookshelfPage />} />
                <Route path="/challenges" element={<ChallengePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/statistics" element={<StatisticsPage />} />
                <Route path="/books/:id" element={<BookPage />} />
                <Route path="/authors/:id" element={<AuthorPage />} />
                <Route path="/genres/:id" element={<GenrePage />} />
                <Route
                  path="/recommended-books"
                  element={<RecommendedBooksPage />}
                />
                <Route
                  path="/recommended-authors"
                  element={<RecommendedAuthorsPage />}
                />
                <Route
                  path="/recommended-genres"
                  element={<RecommendedGenresPage />}
                />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </QueryClientProvider>
        </SnackbarProvider>
      </ThemeProvider>
    </UserProvider>
  );
}
