import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";


export interface BrandTypes {
  count: number;
  next: string;
  previous: string;
  results: {
    id: number;
    title: string;
    image?: string;
  }[];
}

export const useGetBrand = () => {
  return useQuery({
    queryKey: ['brand'],
    queryFn: () => {
      return request.get<BrandTypes>("/brand/").then((res) => res.data);
    },
  });
};