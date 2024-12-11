import { Form, message } from "antd";
import { useCreateBanner } from "./service/mutation/useCreateBanner"
import { useNavigate } from "react-router-dom";
import { BannerForm } from "../../components/banner-form/banner-form";

export interface bannerType{
  title: string;
  description: string;
  image: { file: File };
}

export const BannerCreate = () => {
  const { mutate } = useCreateBanner();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const submit = (data: bannerType) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("image", data.image.file);
    mutate(formData, {
      onSuccess: () => {
        message.success("Banner added successfully");
        form.resetFields();
        navigate('/app/banner-list')
      },
      onError: () => {
        message.error(`Failed to add banner create`);
      },
    });
  };
  return (
    <div>
      <BannerForm onFinish={submit} isLoding={false} isEdit={false} form={form}/>
    </div>
  )
}
