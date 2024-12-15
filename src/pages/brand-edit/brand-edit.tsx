import { useNavigate, useParams } from "react-router-dom"
import { useGetBrandId } from "./service/query/useGetBrandId"
import { useEditBrand } from "./service/mutation/useEditBrand"
import { message } from "antd"
import { FormCategory } from "../../components/form"

interface brandType {
  title: string;
  image: { file: File };
}

export const BrandEdit = () => {
  const { id } = useParams()
  const { data } = useGetBrandId(Number(id))
  const { mutate } = useEditBrand(Number(id))

  const navigate = useNavigate()

  const initialValues = {
    title: data?.title,
    image: data?.image
  }

 
  const submit = (data: brandType) => {
    const formData = new FormData();
    formData.append("title", data.title);
    if (data.image.file) {
      formData.append("image", data.image.file);
    }
    mutate(formData, {
      onSuccess: () => {
        message.success("Brand edit successfully");
        navigate('/app/brand-list')
      },
      onError: () => {
        message.error(`Failed to edit banner`);
      },
    });
  }


  return (
    <div>
      <FormCategory onFinish={submit} isLoding={false} isEdit={true}  initialValues={initialValues} />
    </div>
  )
}
