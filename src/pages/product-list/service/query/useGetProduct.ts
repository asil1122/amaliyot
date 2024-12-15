import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export interface Product {
  id: number;
  image: string;
  title: string;
  price: number;
  is_available: boolean;
  category: string;
  is_new: boolean;
}

export interface ProductResponse {
  count?: number;
  next?: string;
  previous?: string;
  results: Product[];
}



export const useGetProduct = () => {
  return useQuery({
    queryKey: ["product"],
    queryFn: () => 
      request.get<ProductResponse>("/product/")
      .then((res) => res.data),
  });
};
