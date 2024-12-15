import { Form, message } from "antd";
import { useCreateBrand } from "./service/mutation/useCreateBrand"
import { useNavigate } from "react-router-dom";
import { FormCategory } from "../../components/form";

export const BrandCreate = () => {
  const { mutate } = useCreateBrand();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const submit = (data: { title: string; image: { file: File }; }) => {
    const formData = new FormData();
    formData.append("title", data?.title);
    formData.append("image", data.image.file);

    mutate(formData, {
      onSuccess: () => {
        message.success("Brand added successfully");
        form.resetFields();
        navigate("/app/brand-list");
      },
      onError: () => {
        message.error(`Failed to add brand`);
      },
    });
  };

  return (
    <div>
      <FormCategory onFinish={submit} isLoding={false} isEdit={false} form={form} />
    </div>
  )
}
