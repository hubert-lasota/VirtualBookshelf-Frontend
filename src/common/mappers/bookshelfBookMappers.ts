import { CreateBookshelfBookParam } from "../api/clients/bookshelfBookClient";

export function bookshelfBookFormValuesToFormData(
  bookshelfBookFormValues: CreateBookshelfBookParam,
) {
  const {
    book: { cover, ...book },
    ...bookshelfBook
  } = bookshelfBookFormValues;

  const formData = new FormData();
  formData.append(
    "bookshelfBook",
    new Blob(
      [
        JSON.stringify({
          ...bookshelfBook,
          book: {
            ...book,
            coverUrl: typeof cover === "string" ? cover : undefined,
          },
        }),
      ],
      { type: "application/json" },
    ),
  );
  if (cover instanceof File) {
    formData.append("cover", cover);
  }

  return formData;
}
