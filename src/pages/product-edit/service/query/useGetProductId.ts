import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useGetProductId = (id: number) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => request.get(`/product/${id}/`).then((res) => res.data),
  });
};
