import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useVariantDelete = () => {
  return useMutation({
    mutationFn: (id: number) =>
      request.delete(`/product_variant/${id}/`).then((res) => res.data),
  });
};
