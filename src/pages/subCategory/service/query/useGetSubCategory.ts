import { useQuery } from "@tanstack/react-query"
import { categoryType } from "../../../category/service/query/categoryTypes"
import { request } from "../../../../config/request"


export const useGetSubCategory = () => {
    return useQuery({
        queryKey: ['category'],
        queryFn: () => request.get<categoryType>('/api/subcategory/').then((res) => res.data)
    })
}
