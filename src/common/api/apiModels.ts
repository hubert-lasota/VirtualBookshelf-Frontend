export type ApiError = {
  detail: string;
  status: number;
  errors?: { string: string };
};

export type PageMeta = {
  count: number;
  totalCount: number;
  page: number;
  totalPages: number;
};

export type ApiSort = {
  field: string;
  direction: "asc" | "desc";
};
