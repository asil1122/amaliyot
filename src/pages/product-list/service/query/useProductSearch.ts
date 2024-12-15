import { useQuery } from "@tanstack/react-query"
import { request } from "../../../../config/request"
import { ProductResponse } from "./useGetProduct"

export const useProductSearch = (input: string = '') => {
    return useQuery({
        queryKey: ['search', input],
        queryFn: () => request.get<ProductResponse>('/product/',{params: {search: input? input : '00000'}}).then((res) => res.data)
    })
};
