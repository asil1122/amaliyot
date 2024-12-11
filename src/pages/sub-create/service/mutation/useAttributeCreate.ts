import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { Attribute } from "../../sub-create";
export const useAttributeCreate = () => {
  
   return useMutation({
      mutationFn: (data: {attr_list: Attribute[]}) => request.post('/attribute/', data).then((res) => res.data),
      
   })  
}