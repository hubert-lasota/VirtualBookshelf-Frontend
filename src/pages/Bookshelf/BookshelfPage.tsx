import { PageContainer } from "../../common/components/ui/styles";
import BookshelfHeader from "./BookshelfHeader";
import { useGetBookshelves } from "../../common/api/bookshelfClient";
import { useMemo, useState } from "react";
import EmptyBookshelf from "./EmptyBookshelf";
import { BookshelfPageContext } from "./BookshelfPageContext";
import { Stack } from "@mui/material";
import BookshelfSidebar from "./BookshelfSidebar/BookshelfSidebar";
import { ALL_BOOKS_BOOKSHELF_INDEX } from "./common";
import BookshelfForm from "./BookshelfForm/BookshelfForm";
import { GLOBAL_APP_BAR_HEIGHT } from "../../common/components/GlobalAppBar/config";
import BookshelfContent from "./BookshelfContent/BookshelfContent";
import { BookshelfBookResponse } from "../../common/models/bookshelfModels";

export default function BookshelfPage() {
  const { data: { bookshelves } = {}, isLoading } = useGetBookshelves();
  const [query, setQuery] = useState("");
  const [currentBookshelfIndex, setCurrentBookshelfIndex] = useState<number>(
    ALL_BOOKS_BOOKSHELF_INDEX,
  );

  const [isBookshelfFormOpen, setIsBookshelfFormOpen] = useState(false);

  const booksFiltered: BookshelfBookResponse[] = useMemo(() => {
    if (!bookshelves || bookshelves.length === 0) return [];
    let bookshelvesFiltered = [...bookshelves];
    if (currentBookshelfIndex !== ALL_BOOKS_BOOKSHELF_INDEX) {
      bookshelvesFiltered = bookshelvesFiltered.filter(
        (_, index) => index === currentBookshelfIndex,
      );
    }

    const books: BookshelfBookResponse[] = bookshelvesFiltered.flatMap(
      (bookshelf) => bookshelf.books,
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
    <BookshelfPageContext.Provider
      value={{
        currentBookshelf: bookshelves?.[currentBookshelfIndex],
        bookshelves: bookshelves || [],
        currentBookshelfIndex,
        setCurrentBookshelfIndex,
        isBookshelfFormOpen,
        setIsBookshelfFormOpen,
        onQueryChange: setQuery,
      }}
    >
      <PageContainer>
        <BookshelfHeader />
        <Stack
          direction="row"
          sx={{
            width: "100%",
            height: "100%",
            paddingTop: GLOBAL_APP_BAR_HEIGHT,
          }}
        >
          <BookshelfSidebar />
          {isBookshelfFormOpen ? (
            <BookshelfForm />
          ) : (
            <BookshelfContent books={booksFiltered} />
          )}
          {bookshelves?.length === 0 && isLoading && <EmptyBookshelf />}
        </Stack>
      </PageContainer>
    </BookshelfPageContext.Provider>
  );
}
