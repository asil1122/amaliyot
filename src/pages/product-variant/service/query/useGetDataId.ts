import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";


export const useGetDataId = (id: string) => {
  return useQuery({
    queryKey: ["data", id],
    queryFn: () => request.get(`/category/${id}/`).then((res) => res.data),
  });
};