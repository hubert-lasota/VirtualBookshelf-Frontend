import { AxiosResponse } from "axios";

export const unwrapResponseData = (response: AxiosResponse) => response.data;
