import axiosInstance from "../../common/api/axiosInstance.js";

const BASE_ENDPOINT = "/books";

export const getBookById = (id) =>
  axiosInstance.get(`${BASE_ENDPOINT}/${id}`).then((res) => res.data);
