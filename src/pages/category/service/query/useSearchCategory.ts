import { useQuery } from "@tanstack/react-query"
import { request } from "../../../../config/request"
import { categoryType } from "./categoryTypes"


export const useSearchCategory = (input: string = '') => {
    return useQuery({
        queryKey: ['search', input],
        queryFn: () => request.get<categoryType>('/category/',{params: {search: input? input : '00000'}}).then((res) => res.data)
    })
}
