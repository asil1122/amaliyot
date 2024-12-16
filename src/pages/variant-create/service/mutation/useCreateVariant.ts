import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useCreateVariant = () => {
  return useMutation({
    mutationFn: (data: any) =>
      request.post(`/product_variant/`, data).then((res) => res.data.data),
  });
};
