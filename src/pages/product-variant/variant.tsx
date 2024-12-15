import { Button, Flex, message, Table, Popconfirm } from "antd";
import { Link, useParams } from "react-router-dom";
import { ColumnsType } from "antd/es/table";
import { uesGetVariant } from "./service/query/useGetVariant";
import { useVariantDelete } from "./service/mutation/useVariantDelete";

export interface VariantType {
  key: number;
  id: number;
  image: string;
  title: string;
  description: string;
  category?: string | number;
  parent?: string;
}

export const Variants = () => {
  const { id } = useParams();
  const { data } = uesGetVariant();
  const { mutate } = useVariantDelete();
  const variants = data?.results?.map((item: number) => item);


  const deleteVariant = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        message.success("success");
      },
    });
  };

  const variantData = variants?.filter(
    (item: { product: number }) => item.product === Number(id)
  );


  const dataSource = variantData?.map((item: VariantType) => {
    return {
      key: item.id,
      id: item.id,
      img: item.image,
      name: item.title,
    };
  });


  const columns: ColumnsType = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "IMG",
      dataIndex: "img",
      key: "img",
      render: (_, record) => (
        <Link to={`/app/product/variants/${id}/${record.id}/images`}>
          <Button variant="solid" type="primary">
            Show Added Images
          </Button>
        </Link>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (title) => (
        <div style={{ textAlign: "center" }}>
          <h3 style={{ fontSize: "20px", fontWeight: "600" }}>{title}</h3>
        </div>
      ),
    },
    {
      title: "Change",
      dataIndex: "change",
      key: "change",
      render: (_, record) => (
        <Flex gap={"20px"} justify="center">
          <div>
            <Link to={`/app/product/variants/${id}/${record.id}`}>
              <Button type="primary">
                Add image
              </Button>
            </Link>
          </div>
          <div>
            <Popconfirm
              onConfirm={() => {
                return deleteVariant(record.id);
              }}
              cancelText={"No"}
              okText={"Yes"}
              title={"Do you wish to continue with past date?"}
            >
              <Button type="primary">
                Delete
              </Button>
            </Popconfirm>
          </div>
        </Flex>
      ),
    },
  ];

  return (
    <>
      <div style={{ marginBottom: "20px" }}>
        <Link to={`/app/product/variants/${id}/create`}>
          <Button type="primary">Create</Button>
        </Link>
      </div>
      <Table dataSource={dataSource} columns={columns} bordered size="large" />
    </>
  );
};
