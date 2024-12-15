import { Button, Form, Input, Select, Switch, Upload, UploadFile } from 'antd'
import { formType } from '../form';
import { useGetSubCategory } from '../../pages/subCategory/service/query/useGetSubCategory';

export const ProductForm = ({ onFinish, form, isLoding, initialValues, isEdit }: formType) => {
  const { data } = useGetSubCategory();
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
    <>
      {isLoding ? (
        <h1>Loading.....</h1>
      ) : (
        <Form
          initialValues={{is_available: false, is_new: false, ...initialValues}}
          layout="vertical"
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label={"Category"}
            name={"category"}
            rules={[{ required: true, message: "parent kiriting" }]}
          >
            <Select placeholder="Parent Category">
              {data?.results?.map((item) => (
                <Select.Option value={item.id} key={item.id}>
                  {item.title}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label={"Title"}
            name={"title"}
            rules={[{ required: true, message: "title kiriting" }]}
          >
            <Input placeholder="Title" />
          </Form.Item>
          <div className='wrapper_switch'>
            <Form.Item
              label={"Is_available"}
              name={"is_available"}
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>

            <Form.Item
              label={"is_new"}
              name={"is_new"}
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </div>

          <Form.Item
            label={"Price"}
            name={"price"}
            rules={[{ required: true, message: "title kiriting" }]}
          >
            <Input type='number' placeholder="price" />
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
              // fileList={fileList}
              // onChange={({ fileList: newFileList }) => setFileList(newFileList)}
              defaultFileList={isEdit ? defaultFileList : []}
            >
              <Button type="primary">
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
  )
}
