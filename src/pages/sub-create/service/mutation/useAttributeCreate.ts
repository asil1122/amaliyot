import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { attr_listType } from "../../sub-create";
export const useAttributeCreate = () => {
  
   return useMutation({
      mutationFn: (data: {attr_list: attr_listType[]}) => request.post('/attribute/', data).then((res) => res.data),
      
   })  
}


