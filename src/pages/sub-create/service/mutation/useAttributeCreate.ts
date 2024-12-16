import { useMutation } from "@tanstack/react-query";
import { request } from "../../../../config/request";
import { attr_listType } from "../../sub-create";
export const useAttributeCreate = () => {
  
   return useMutation({
      mutationFn: (data: {attr_list: attr_listType[]}) => request.post('/attribute/', data).then((res) => res.data),
      
   })  
}


// import request from "../../../../config/request";
// import { useMutation } from "@tanstack/react-query";
// import { attr_listType } from "../../create-subcategory";

// export const usePostAribute = () => {
//   return useMutation({
//     mutationFn: (data: { attr_list: attr_listType[] }) => {
//       return request.post("/attribute/", data).then((res) => res.data);
//     },
//   });
// };