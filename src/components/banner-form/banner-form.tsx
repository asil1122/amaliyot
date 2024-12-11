
import { Button, Form, Input, Upload, UploadFile } from "antd"
import { formType } from "../form"

export const BannerForm = ({ onFinish, initialValues, isLoding, isEdit, form }: formType) => {
  console.log(initialValues, 'initialValues');

  const defaultFileList: UploadFile[] = [
    {
      uid: "-1",
      // name: `${initialValues?.title}`,
      status: "done",
      url: `${initialValues?.image}`,
    },
  ];

  if (initialValues && initialValues?.title == undefined) return <div>Loading...</div>

  return (
    <div>
      {isLoding ? (
        <h1>Loading.....</h1>
      ) : (
        <Form
          initialValues={{...initialValues}}
          layout="vertical"
          form={form}
          onFinish={onFinish}
          style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input placeholder="Enter category title" />
          </Form.Item>
          <Form.Item label="Description" name="description" rules={[{ required: true, message: "Please input the description!" }]}>
            <Input.TextArea placeholder="Enter category description" />
          </Form.Item>
          <Form.Item
            label="Image"
            name="image"
            valuePropName="file"
          >
            <Upload
              beforeUpload={() => false}
              accept="image"
              maxCount={1}
              listType="picture"
              defaultFileList={isEdit ? defaultFileList : []}
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

    </div>
  )
}
