import { Button, Form, Input, Select, Upload } from "antd"
import { formType } from "../form";
import { useGetProducts } from "../../pages/category/service/query/useGetProducts";

export const SubForm = ({ onFinish, form, isLoding, initialValues, isEdit, defaultFileList }: formType) => {
  const { data } = useGetProducts();
  console.log(isLoding);
  console.log(isEdit);
  

  // const defaultFileList: UploadFile[] = [
  //   {
  //     uid: "-1",
  //     name: `${initialValues?.title}`,
  //     status: "done",
  //     url: `${initialValues?.image}` || '',
  //   },
  // ];

  // if (initialValues && initialValues?.title == undefined) return <div>Loading...</div>
  return (
    <>
      {isLoding ? (
        <h1>Loding.....</h1>
      ) : (
        <Form
          initialValues={{ title: initialValues?.title }}
          layout="vertical"
          form={form}
          onFinish={onFinish}
          style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}
        >
          <Form.Item label="Parent Category" name="parent">
            <Select  placeholder="Select a parent category">
              {data?.results?.map((item) => (
                <Select.Option  key={item.id} value={item.parent?.id}>
                  {item.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input placeholder="Enter category title" />
          </Form.Item>

          <Form.Item
            label="Image"
            name="image"
            valuePropName="file"
            rules={[{ required: true, message: "Please upload an image!" }]}
          >
            <Upload
              beforeUpload={() => false}
              accept="image"
              maxCount={1}
              listType="picture"
              defaultFileList={defaultFileList ? defaultFileList : []}
            >
              <Button>Upload Image</Button>
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Add Category
            </Button>
          </Form.Item>
        </Form>
      )}

    </>
  )
}
