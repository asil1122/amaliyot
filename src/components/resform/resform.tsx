import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload } from "antd";
import { formType } from "../form";
import { RcFile } from "antd/es/upload";

export interface Typ {
  title: string;
  image: RcFile | null | any;
}

export const ResForm = ({ onFinish, initialValues, isLoding , defaultFileList }: formType) => {

  const [form] = Form.useForm();

  console.log(initialValues, "initialValues");
  

  const handleSubmit = (value: Typ) => {
    console.log(value, 'valsefefaf' );

    if (onFinish) {
      onFinish({
        title: value.title,
        image: value.image
      });
    }
  };

  return (
    <>
      {!isLoding && (
        <Form
          layout="vertical"
          initialValues={{...initialValues}}
          onFinish={handleSubmit}
          form={form}
        >
          <Form.Item
            label={"Title"}
            name={"title"}
            rules={[{ required: true, message: "title kiriting" }]}
          >
            <Input  placeholder="Title" />
          </Form.Item>
          <Form.Item
            label={"img"}
            name={"image"}
            valuePropName="file"
            rules={[{ required: true, message: "img kiriting" }]}
          >
            <Upload
              style={{ width: "500px" }}
              listType="picture"
              beforeUpload={() => false}
              accept="image/*"
              maxCount={1}
              defaultFileList={defaultFileList ? defaultFileList : []}
            >
              <Button type="primary" icon={<UploadOutlined />}>
                Upload
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" type="primary">
              Send
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};
