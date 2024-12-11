import { useNavigate, useParams } from "react-router-dom";
import { useGetBannerId } from "./service/query/useGetBannerId";
import { BannerForm } from "../../components/banner-form/banner-form";
import { useEditBanner } from "./service/mutation/useEditBanner";
import { message } from "antd";
import { bannerType } from "../banner-create";

export const EditBanner = () => {
  const { id } = useParams();
  const {data: bannerData} = useGetBannerId(Number(id))
  const navigate = useNavigate()
  const { mutate } = useEditBanner(Number(id));
  console.log(bannerData, "banner data");
  
  const initialValues = {
    title: bannerData?.title,
    description: bannerData?.description,
    image: bannerData?.image
  }

  const submit = (data: bannerType) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (data.image.file) {
      formData.append("image", data.image.file);
    }
    mutate(formData, {
      onSuccess: () => {
        message.success("Banner edit successfully");
        navigate('/app/banner-list')
      },
      onError: () => {
        message.error(`Failed to edit banner`);
      },
    });
  }

  return (
    <BannerForm initialValues={initialValues} isLoding={false} isEdit={true} onFinish={submit}/>
  )
}
