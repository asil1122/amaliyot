import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { loginType } from "./loginType";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data) =>
      request
        .post<loginType>("/api/admin-login/", data)
        .then((res) => res.data),
  });
};
