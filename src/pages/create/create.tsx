import { RcFile } from "antd/es/upload"
import { FormCategory } from "../../components/form"
import { useCreateBrand } from "./service/useCreateBrand"
import { Form, message } from "antd"

export const Create = () => {
  const { mutate } = useCreateBrand()
  const [form] = Form.useForm();

  // const submit = (data: categoryType) => {
  //   console.log(data);

  //   mutate(data, {
  //     onSuccess: () => {
  //       message.success('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  //     }
  //   })
  // }


  const submit = (values: { title: string; image: { file: RcFile } }) => {
    const formData = new FormData();
    console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',values);
    
    formData.append("title", values.title);

    if (values.image) {
      formData.append("image", values.image.file);
    }

    mutate(formData, {
      onSuccess: () => {
        message.success("Category added successfully!");
        form.resetFields();
      },
      onError: (error) => {
        message.error(`Failed to add category: ${error.message}`);
      },
    });
  };

  return (
    <>
      <FormCategory isLoding={false} onFinish={submit} form={form} />
    </>
  )
}


