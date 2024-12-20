import { Form, message, Tabs } from "antd"
import { SubForm } from "../../components/sub-form"
import { useState } from "react"
import { RcFile } from "antd/es/upload"
import { useCreateSub } from "./service/mutation/useCreateSub"
import { SubAttributeForm } from "../../components/sub-attribute-form"
import { useAttributeCreate } from "./service/mutation/useAttributeCreate"
import { useNavigate } from "react-router-dom"

export interface Attribute {
  category?: number[];
  key?: number;
  id?: number;
  title: string;
  values: string[];
}

export interface attr_listType {
  category: number[];
  title: string;
  values: string[];
}

export interface FormValues {
  title?: string;
  values?: {
    value?: string;
    value_id?: number;
  }[];
  category_id?: number;
  attribute_id?: number;
  attributes?: string[] | any;
}
export const SubCreate = () => {
  const { mutate, data: categoryData } = useCreateSub()
  const { mutate: attributeMutate } = useAttributeCreate()
  const [tabs, setTabs] = useState<string>('1')
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const SubCategorySubmit = (values: { title: string; image: { file: RcFile }; parent: string }) => {
    const formData = new FormData();
    console.log('parent', values);

    formData.append("title", values.title);
    if (values.image) {
      formData.append("image", values.image.file);
    }
    formData.append("parent", values.parent);

    mutate(formData, {
      onSuccess: () => {
        message.success("Category added successfully!");
        form.resetFields();
        setTabs('2')
      },
      onError: (error) => {
        message.error(`Failed to add category: ${error.message}`);
      },
    });
  };

  const attributeSubmit = (data: FormValues) => {
    const attr_list: attr_listType[] = data.attributes.map((item: attr_listType) => ({
      category: [categoryData?.id],
      title: item.title,
      values: item.values.map((value) => value),
    }));
    console.log({ attr_list }, "dataAsil");
  
    attributeMutate(
      { attr_list },
      {
        onSuccess: () => {
          message.success("Attributes added successfully");
          form.resetFields();
          navigate("/app/sub-category");
        },
        onError: (error: any) => {
          message.error(`Failed to add attributes: ${error.message}`);
        },
      }
    );
  };
  
  return (
    <>
      <Tabs defaultActiveKey="1" activeKey={tabs} items={[
        {
          key: '1',
          label: 'Add Category',

          children: <SubForm isEdit={false} isLoding={false} onFinish={SubCategorySubmit} form={form} />
        },
        {
          key: '2',
          label: 'Sub Category',
          // disabled: !categoryData?.id,
          children: <SubAttributeForm isLoding={false} onFinish={attributeSubmit} />
        }
      ]}>
      </Tabs>
    </>
  )
}
