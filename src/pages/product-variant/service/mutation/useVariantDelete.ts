import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { client } from "../../../../config/query-client";

export const useVariantDelete = () => {
  return useMutation({
    mutationFn: (id: number) =>
      request.delete(`/product_variant/${id}/`).then((res) => res.data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["variant"] });
    }
  });

};
