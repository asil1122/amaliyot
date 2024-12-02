import { Button, Form, Input, Upload } from "antd"

interface formType {
  onFinish: (values: any) => void,
  isLoding: boolean,
  isPending?: boolean,
  data?: any
  form: any
}

export const FormCategory = ({ onFinish, form, isLoding, data = {} }: formType) => {

  return (
    <div>
      {isLoding ? (
        <h1>Loding.....</h1>
      ) : (
        <Form
          initialValues={{...data}}
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
