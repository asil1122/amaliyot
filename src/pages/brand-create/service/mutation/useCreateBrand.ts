import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const useCreateBrand = () => {
  return useMutation({
    mutationFn: (data: FormData) => {
      return request.post("/brand/", data);
    },
  });
};