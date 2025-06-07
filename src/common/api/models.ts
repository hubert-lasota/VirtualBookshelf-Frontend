export type ApiError = {
  detail: string;
  status: number;
  errors?: { string: string };
};

export type PaginatedResponse<ContentType, ContentFieldName extends string> = {
  [K in ContentFieldName]: ContentType[];
} & {
  count: number;
  totalCount: number;
  page: number;
  totalPages: number;
};
