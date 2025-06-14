import { PageContainer } from "../../common/components/styles";
import BookshelfHeader from "./BookshelfHeader";
import { useGetBookshelves } from "../../features/bookshelf/bookshelfClient";
import { useMemo, useState } from "react";
import { BookshelfBookWithId } from "../../features/bookshelf/models";
import BookGrid from "./BookGrid";
import EmptyBookshelf from "./EmptyBookshelf";
import { BookshelfPageContext } from "./BookshelfPageContext";
import ManageBookshelfFab from "./ManageBookshelfFab";

export const SHOW_ALL_BOOKS_INDEX = -1;

export default function BookshelfPage() {
  const { data: { bookshelves } = {} } = useGetBookshelves();
  const [query, setQuery] = useState("");
  const [currentBookshelfIndex, setCurrentBookshelfIndex] =
    useState<number>(SHOW_ALL_BOOKS_INDEX);

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
        bookshelf?.books?.map((book) => ({
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
        bookshelves: bookshelves || [],
        currentBookshelfIndex,
        setCurrentBookshelfIndex,
        onQueryChange: setQuery,
      }}
    >
      <PageContainer>
        <BookshelfHeader />
        <BookGrid books={booksFiltered} />
        {bookshelves?.length === 0 && <EmptyBookshelf />}
        <ManageBookshelfFab />
      </PageContainer>
    </BookshelfPageContext.Provider>
  );
}
