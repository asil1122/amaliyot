import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { loginType } from "./loginType";

interface tokenType {
  token: string;
}

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: loginType) =>
      request
        .post<tokenType>("/api/admin-login/", data)
        .then((res) => res.data),
  });
};
