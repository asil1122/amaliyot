import { useMutation } from "@tanstack/react-query";
import { request } from "../../../config/request";
import { FormValues } from "../../sub-create";

export const useAttributeEdit = () => {
  return useMutation({
    mutationFn: (data: FormValues| any) =>
      request.patch(`/api/category_edit/`, data).then((res) => res.data),
  });
};
