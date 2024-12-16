import { Form, message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductId } from "./service/query/useGetProductId";
import { ProductForm } from "../../components/product-form";
import { useEditProduct } from "./service/mutation/useEditProduct";

export const ProductEdit = () => {
  const { id } = useParams();
  const { data: productData } = useGetProductId(Number(id));
  const { mutate } = useEditProduct(Number(id));
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const initialValues = {
    title: productData?.title,
    is_available: productData?.is_available,
    is_new: productData?.is_new,
    image: productData?.image,
    price: productData?.price,
    category: productData?.category,
  };

  const submit = (data: any) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("category", data.category);
    formData.append("price", data.price);
    formData.append("is_new", data.is_new);
    formData.append("is_available", data.is_available);
    if (data?.image?.file) {
      formData.append("image", data.image.file);
    }
    mutate(formData, {
      onSuccess: () => {
        message.success("success edit");
        navigate("/app/product-list");
      },
      onError: () => {
        message.error("error edit");
      },
    });
  };


  return (
    <>
      <ProductForm isEdit={true} initialValues={initialValues} isLoding={false} onFinish={submit} form={form} />
    </>
  );
};
