import { message, Tabs } from "antd"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { SubAttributeForm } from "../../components/sub-attribute-form";
import { useGetSubId } from "./service/query/useGetSubId";
import { useAttributeEdit } from "./mutation/useAttrEdit";
import { RcFile, UploadFile } from "antd/es/upload";
import { useEditSub } from "./mutation/useEditSub";
import { FormValues } from "../sub-create";
import { ResForm } from "../../components/resform/resform";

export interface FormDataTypes {
  parent?: string | any;
  title: string;
  image?: { file: RcFile };
}


export const EditSubCategory = () => {
  const { id } = useParams();
  const { data: subId} = useGetSubId(Number(id))
  const [tabs, setTabs] = useState<string>('1')
  const { mutate } = useAttributeEdit()
  const navigate = useNavigate()
  const { mutate: mutateSub } = useEditSub()

  console.log(subId, 'subidddddddddddddddd');
  
  
  const submit = (data: FormDataTypes) => {
    const formData = new FormData();
    formData.append("title", data.title);

    if (data.image) {
      formData.append("image", data.image.file);
    }

    mutateSub(
      { id, data: formData },
      {
        onSuccess: () => {

          message.success("U just edited sub");
          setTabs('2')
        },
        onError: () => {
          message.error("You might miss to edit something ");
        },
      }
    );
  };


  const defaultFileList: UploadFile[] = [
    {
      uid: "-1",
      name: `${subId?.title}`,
      status: "done",
      url: subId?.image || undefined,  
    },
  ];
    

  const AttributeId = subId?.attributes?.map(
    (item: number | any) => item.id
  );
  const valueId = subId?.attributes?.map((item: number | any) =>
    item.values.map((subItem: any) => subItem.id)
  );
  const submitAttribute = (values: FormValues) => {

    const processedAttributes = [
      ...values?.attributes?.map(
        (item: FormValues, index: number) => ({
          attribute_id: AttributeId[index] ?? null,
          title: item.title,
          values: item.values?.map((subItem, subIndex) => ({
            value: subItem.value,
            value_id: valueId[index]?.[subIndex] ?? null,
          })),
        })
      ),
    ];
    mutate(
      { attributes: processedAttributes, category_id: Number(id) },
      {
        onSuccess: () => {
          message.success("Attributes updated successfully!");
          navigate("/app/sub-category");
        },
        onError: (err) => {
          message.error("Failed to update attributes!");
          console.error("errorasdasd", err);
        },
      }
    );
  };

  return (
    <div>
      <Tabs defaultActiveKey="1" activeKey={tabs} items={[
        {
          key: '1',
          label: 'Add Category',
          children: <ResForm isLoding={false} isEdit={true} initialValues={subId} defaultFileList={defaultFileList} onFinish={submit}  />
        },
        {
          key: '2',
          label: 'Sub Category',
          // disabled: !categoryData?.id,
          children: <SubAttributeForm isLoding={false} onFinish={submitAttribute}/>
        }
      ]}>
      </Tabs>
    </div>
  )
}
