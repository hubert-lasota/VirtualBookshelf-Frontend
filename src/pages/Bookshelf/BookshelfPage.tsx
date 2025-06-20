import { PageContainer } from "../../common/components/styles";
import BookshelfHeader from "./BookshelfHeader";
import { useGetBookshelves } from "../../features/bookshelf/bookshelfClient";
import { useMemo, useState } from "react";
import BookGrid from "./BookGrid";
import EmptyBookshelf from "./EmptyBookshelf";
import { BookshelfPageContext } from "./BookshelfPageContext";
import { Stack } from "@mui/material";
import BookshelfSidebar from "./BookshelfSidebar/BookshelfSidebar";
import { BookshelfBookWithId } from "../../features/bookshelf/bookshelfBookModels";
import { ALL_BOOKS_BOOKSHELF_INDEX } from "./common";
import BookshelfContentHeader from "./BookshelfContentHeader";

export default function BookshelfPage() {
  const { data: { bookshelves = [] } = {} } = useGetBookshelves();
  const [query, setQuery] = useState("");
  const [currentBookshelfIndex, setCurrentBookshelfIndex] = useState<number>(
    ALL_BOOKS_BOOKSHELF_INDEX,
  );

  const booksFiltered: BookshelfBookWithId[] = useMemo(() => {
    if (!bookshelves || bookshelves.length === 0) return [];
    let bookshelvesFiltered = [...bookshelves];
    if (currentBookshelfIndex !== ALL_BOOKS_BOOKSHELF_INDEX) {
      bookshelvesFiltered = bookshelvesFiltered.filter(
        (_, index) => index === currentBookshelfIndex,
      );
    }

    const books: BookshelfBookWithId[] = bookshelvesFiltered.flatMap(
      (bookshelf) =>
        (bookshelf?.books ?? []).map((book) => ({
          ...book,
          bookshelfId: bookshelf.id,
        })),
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
        bookshelves,
        currentBookshelfIndex,
        setCurrentBookshelfIndex,
        onQueryChange: setQuery,
      }}
    >
      <PageContainer>
        <BookshelfHeader />
        <Stack direction="row" sx={{ width: "100%", height: "100%" }}>
          <BookshelfSidebar />
          <Stack sx={(theme) => ({ padding: theme.spacing(3) })}>
            <BookshelfContentHeader />
            <BookGrid books={booksFiltered} />
          </Stack>
          {bookshelves?.length === 0 && <EmptyBookshelf />}
        </Stack>
      </PageContainer>
    </BookshelfPageContext.Provider>
  );
}
