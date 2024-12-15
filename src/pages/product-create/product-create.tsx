import { Form, message } from "antd";
import { RcFile } from "antd/es/upload";
import { useNavigate } from "react-router-dom";
import { ProductForm } from "../../components/product-form";
import { useProductCreate } from "./service/mutation/useProductCreate";
export const ProductCreate = () => {
  const { mutate } = useProductCreate();
  const [ form ] = Form.useForm();
  const navigate = useNavigate();

  const ProductCreate = (values: { title: string; price: string; image: { file: RcFile }; category: string; is_available?: boolean | undefined | any; is_new?: boolean | undefined | any; }) => {
    console.log("valueess", values?.category);

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("price", values.price);
    formData.append("category", values.category);
    formData.append("is_available", values.is_available);
    formData.append("is_new", values.is_new);
    if (values?.image.file) {
      formData.append("image", values.image.file);
    }
    mutate(formData, {
      onSuccess: () => {
        message.success("success");
        form.resetFields();
        navigate("/app/product-list");
      },
      onError: () => {
        message.error("error");
      },
    });
  };
  return (
    <>
      <ProductForm  onFinish={ProductCreate} form={form} isLoding={false} isEdit={false}/>
    </>
  );
};
