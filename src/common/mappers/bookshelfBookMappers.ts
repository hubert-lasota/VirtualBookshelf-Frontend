import { CreateReadingBookParams } from "../api/clients/readingBookClient";

export function readingBookFormValuesToFormData(
  readingBookFormValues: CreateReadingBookParams,
) {
  const {
    book: { cover, ...book },
    ...bookshelfBook
  } = readingBookFormValues;

  const formData = new FormData();
  formData.append(
    "readingBook",
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
