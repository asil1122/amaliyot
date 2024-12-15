import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { client } from "../../../../config/query-client";

export const useEditProduct = (id: number) => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request.patch(`/product/${id}/`, data).then((res) => { res.data }),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["product"] });
    },
  });
};
