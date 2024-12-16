import { message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { VariantForm } from "../../components/variant-form";
import { useCreateVariant } from "./service/mutation/useCreateVariant";

export const VAriantCreate = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { mutate } = useCreateVariant();
  const submit = (values: {
    title: string;
    price: string;
    product: string;
    attribute_value: (number | string)[];
    is_available: boolean | undefined;
    is_new: boolean | undefined;
    quantity: string | number;
    images: null;
    other_detail: string;
  }) => {
    const data = {
      is_available: values.is_available,
      other_detail: values.other_detail,
      price:  parseFloat(values.price).toFixed(2),
      quantity: values.quantity,
      title: values.title,
      images: null,
      product: Number(id),
      attribute_value: values.attribute_value,
    };

    mutate(data, {
      onSuccess: () => {
        message.success("success");
        navigate(`/app/product-list/variants/${id}`);
      },
      onError: () => {
        message.error("error");
      },
    });
  };
  return (
    <>
      <VariantForm isLoding={false} onFinish={submit} />
    </>
  );
};
