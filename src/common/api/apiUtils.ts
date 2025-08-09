import { AxiosResponse } from "axios";
import { ApiSort } from "./apiModels";

export const unwrapResponseData = (response: AxiosResponse) => response.data;

export const apiSortToString = (sort: ApiSort) =>
  `${sort.field},${sort.direction}`;
