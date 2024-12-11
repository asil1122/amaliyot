import { useMutation } from "@tanstack/react-query";
import { client } from "../../../../config/query-client";
import { request } from "../../../../config/request";
export const useCreateBanner = () => {
  return useMutation({
    mutationFn: (data: FormData) => {
      return request.post("/banner/", data).then((res) => res.data.data);
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["banner"] });
    },
  });
};
