import { Button, Form, Input, Select, Switch } from "antd";
import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { formType } from "../form";
import { useGetProduct } from "../../pages/product-list/service/query/useGetProduct";
import { useGetDataId } from "../../pages/product-variant/service/query/useGetDataId";

export const VariantForm = ({ onFinish, isLoding }: formType) => {
  const [form] = Form.useForm();
  const { id: productId } = useParams();
  const { data: product } = useGetProduct();
  const { Option } = Select;
  const id = product?.results.find(
    (item: any) => item.id === Number(productId)
  )?.category;

  const { data: singleData } = useGetDataId(Number(id));

  const [editorState, setEditorState] = useState<string>("");

  const quillRef = useRef(null);

  const handleEditorChange = (value: string) => {
    setEditorState(value);
  };
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],

    [{ header: 1 }, { header: 2 }], 
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }], 
    [{ indent: "-1" }, { indent: "+1" }], 
    [{ direction: "rtl" }], 

    [{ size: ["small", false, "large", "huge"] }], 
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], 
    [{ font: [] }],
    [{ align: [] }],

    ["clean"], 
  ];

  return (
    <>
      {!isLoding && (
        <Form
          initialValues={{
            is_new: false,
            is_available: false,
          }}
          layout="vertical"
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label={"Attribute Value"}
            name={"attribute_value"}
            rules={[{ required: true, message: "Attribute kiriting" }]}
          >
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Select Attributes"
              optionLabelProp="label"
            >
              {singleData?.attributes?.map((item: any) => (
                <React.Fragment key={item.id}>
                  <Option key={item.id} disabled>
                    {item.title}
                  </Option>
                  {item.values.map((item2: any) => (
                    <Option
                      value={item2.id.toString()}
                      label={item2.value}
                      key={item2.id}
                    >
                      {item2.value}
                    </Option>
                  ))}
                </React.Fragment>
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
          <Form.Item
            label={"Is_available"}
            valuePropName="checked"
            name={"is_available"}
          >
            <Switch />
          </Form.Item>


          <Form.Item valuePropName="checked" label={"is_new"} name={"is_new"}>
            <Switch />
          </Form.Item>
          <Form.Item
            label={"Quantity"}
            name={"quantity"}
            rules={[{ required: true, message: "quantity kiriting" }]}
          >
            <Input placeholder="quantity" />
          </Form.Item>
          <Form.Item
            label={"Price"}
            name={"price"}
            rules={[{ required: true, message: "price kiriting" }]}
          >
            <Input placeholder="Price" />
          </Form.Item>
          <Form.Item
            name="other_detail"
            label="Description"
            rules={[
              { required: true, message: "Description kiriting!" },
            ]}
          >
            <ReactQuill
              style={{ height: "300px", marginBottom: "50px" }}
              ref={quillRef}
              value={editorState}
              onChange={handleEditorChange}
              modules={{
                toolbar: toolbarOptions,
              }}
            />
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
