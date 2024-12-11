import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { request } from "../../../config/request";
export const useEditSub = () => {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: any) =>
      request.patch(`/category/${id}/`, data).then((res) => res.data),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["category"] });
    },
  });
};
