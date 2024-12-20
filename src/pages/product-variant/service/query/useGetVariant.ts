import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export const uesGetVariant = () => {
  return useQuery({
    queryKey: ["variant"],
    queryFn: () => request.get("/product_variant/").then((res) => res.data),
  });
};
