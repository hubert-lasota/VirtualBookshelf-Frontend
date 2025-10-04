import { useQuery } from "@tanstack/react-query";
import { UserFilter } from "../../models/userModels";
import axiosInstance from "../axiosInstance";
import { unwrapResponseData } from "../apiUtils";

type UseGetUsersParams = UserFilter & { enabled?: boolean };

export const useGetUsers = ({ enabled, ...filter }: UseGetUsersParams) =>
  useQuery({
    queryKey: ["users", filter],
    queryFn: () =>
      axiosInstance
        .get("/v1/users", { params: filter })
        .then(unwrapResponseData),
    enabled,
  });
