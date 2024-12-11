import { useQuery } from "@tanstack/react-query";
import { request } from "../../../../config/request";

export type BnnTypes = {
  id: number;
  title: string;
  description: string;
  image: string;
  created_at: string;
  updated_at: string;
};


export interface BannerTypes {
  count: number;
  next?: string | null;
  previous?: string | null;
  results: BnnTypes[];
}
export const useGetBanner = () => {
  return useQuery({
    queryKey: ["banner"],
    queryFn: () => {
      return request.get<BannerTypes>("/banner/").then((res) => res.data);
    },
  });
};