import { useQuery } from "@tanstack/react-query"
import { request } from "../../../../config/request"


export const useGetBannerId = (id: number) => {
    return useQuery({
        queryKey: ['banner',id],
        queryFn: () => request.get(`/banner/${id}/`).then((res) => res.data)
    })
}

