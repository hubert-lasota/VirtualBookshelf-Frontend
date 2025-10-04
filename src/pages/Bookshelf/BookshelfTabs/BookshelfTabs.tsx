import { useBookshelfPageContext } from "../BookshelfPageContext";
import TabStack from "../../../common/components/Tab/TabStack";

export default function BookshelfTabs() {
  const {
    bookshelves,
    allBooksBookshelf,
    currentBookshelf,
    onCurrentBookshelfChange,
    selectAllBooksBookshelf,
  } = useBookshelfPageContext();

  const tabs = [allBooksBookshelf, ...bookshelves].map((bookshelf) => ({
    value: bookshelf.id,
    label: bookshelf.name + ` (${bookshelf.totalBooks})`,
  }));

  return (
    <TabStack
      tabs={tabs}
      maxVisibleTabs={4}
      value={currentBookshelf.id}
      onChange={(_e, bookshelfId) =>
        bookshelfId === allBooksBookshelf.id
          ? selectAllBooksBookshelf()
          : onCurrentBookshelfChange(
              bookshelves.find((b) => b.id === bookshelfId)!,
            )
      }
    />
  );
}
