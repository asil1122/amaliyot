import { Button, Flex, Image, message, Table } from "antd";
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
      render: (img) => <Image src={img} alt="img" width={80} height={70}/>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Change",
      dataIndex: "change",
      key: "change",
      render: (_, record) => (
        <Flex gap={"20px"} justify="center">
          <div>
              <Button type="primary">
                Image
              </Button>
          </div>
          <div>
              <Button type="primary" onClick={() => deleteVariant(record.id)}>
                Delete
              </Button>
          </div>
        </Flex>
      ),
    },
  ];

  return (
    <>
      <div style={{ marginBottom: "20px" }}>
        <Link to={`/app/product-list/variants/${id}/create`}>
          <Button type="primary">Create</Button>
        </Link>
      </div>
      <Table dataSource={dataSource} columns={columns} bordered size="large" />
    </>
  );
};
