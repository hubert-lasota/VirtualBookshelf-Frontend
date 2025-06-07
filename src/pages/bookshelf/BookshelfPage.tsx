import { PageContainer } from "../../common/components/styles";
import BookshelfHeader from "./BookshelfHeader";
import { useGetBookshelves } from "../../features/bookshelf/bookshelfClient";
import { useMemo, useState } from "react";
import { BookshelfBookWithId } from "../../features/bookshelf/models";
import BookGrid from "./BookGrid";
import { useUserContext } from "../../features/user/UserContext";
import EmptyBookshelf from "./EmptyBookshelf";
import { Fab } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ManageBookshelvesDialog from "./manage_bookshelves_dialog/ManageBookshelvesDialog";
import { BookshelfPageContext } from "./BookshelfPageContext";

export const SHOW_ALL_BOOKS_INDEX = -1;

export default function BookshelfPage() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();
  const { data: { bookshelves } = {} } = useGetBookshelves();
  const [query, setQuery] = useState("");
  const [currentBookshelfIndex, setCurrentBookshelfIndex] =
    useState<number>(SHOW_ALL_BOOKS_INDEX);
  const [isManageDialogOpen, setIsManageDialogOpen] = useState(false);

  const booksFiltered: BookshelfBookWithId[] = useMemo(() => {
    if (!bookshelves || bookshelves.length === 0) return [];
    let bookshelvesFiltered = [...bookshelves];
    if (currentBookshelfIndex !== SHOW_ALL_BOOKS_INDEX) {
      bookshelvesFiltered = bookshelvesFiltered.filter(
        (_, index) => index === currentBookshelfIndex,
      );
    }

    const books: BookshelfBookWithId[] = bookshelvesFiltered.flatMap(
      (bookshelf) =>
        bookshelf.books.map((book) => ({ ...book, bookshelfId: bookshelf.id })),
    );

    if (query) {
      return books.filter((bookshelfBook) => {
        const { title, authors } = bookshelfBook.book;
        const cleanedQuery = query.replaceAll(" ", "");
        return (
          title.replaceAll(" ", "").includes(cleanedQuery) ||
          authors.join("").includes(cleanedQuery)
        );
      });
    }
    return books;
  }, [bookshelves, query, currentBookshelfIndex]);

  return (
    <BookshelfPageContext.Provider value={{ bookshelves: bookshelves || [] }}>
      <PageContainer>
        <BookshelfHeader
          bookshelves={bookshelves || []}
          currentBookshelfIndex={currentBookshelfIndex}
          onCurrentBookshelfIndexChange={setCurrentBookshelfIndex}
          onQueryChange={(query) => setQuery(query)}
        />
        <BookGrid books={booksFiltered} />
        {bookshelves?.length === 0 && <EmptyBookshelf />}
        <Fab
          sx={{ position: "fixed", right: "2.5rem", bottom: "3rem" }}
          color="primary"
          size="large"
          variant="extended"
          onClick={() => setIsManageDialogOpen(true)}
        >
          <SettingsIcon sx={{ marginRight: "0.7rem" }} />
          {isPlLanguage ? "Ustawienia" : "Settings"}
        </Fab>
        <ManageBookshelvesDialog
          open={isManageDialogOpen}
          onClose={() => setIsManageDialogOpen(false)}
        />
      </PageContainer>
    </BookshelfPageContext.Provider>
  );
}
