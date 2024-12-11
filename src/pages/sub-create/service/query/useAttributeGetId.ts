import { useQuery } from "@tanstack/react-query"
import { request } from "../../../../config/request"


export const useGetProducts = (id: number) => {
    return useQuery({
        queryKey: ['Attribute'],
        queryFn: () => request.get(`/attribute/${id}`).then((res) => res.data)
    })
}
