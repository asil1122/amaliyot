import Table, { ColumnsType } from "antd/es/table";
import { useGetBrand } from "./service/query/useGetBrand"
import { Link } from "react-router-dom";
import { Button, Image, message } from "antd";
import { useDeleteBrand } from "./service/mutation/useDeleteBrand";

export const BrandList = () => {
  const { data } = useGetBrand()
  const { mutate } = useDeleteBrand()

  const BrandDelete = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        message.success("Successfully deleted!");
      }
    })
  }
  const dataSource = data?.results.map((item) => {

    return {
      key: item.id,
      id: item.id,
      img: item.image,
      title: item.title,
    };
  }) || [];

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
      render: (image) => <Image src={image} alt="img" width={80} height={70}/>
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div>
          <Link to={`/app/brand-list/edit/${record.id}`}>
            <Button type="primary">Edit</Button>
          </Link>
          <Button type="primary" onClick={() => BrandDelete(record.id)}>Delete</Button>
        </div>
      )
    }
  ]
  return (
    <div className="table-wrapper">
    <Link to={'/app/brand-list/create'}>
      <Button type="primary" variant="dashed">Create</Button>
    </Link>
    <div style={{ marginTop: '20px' }}>
      <Table style={{scrollbarWidth: 'auto'}} columns={columns}  dataSource={dataSource} />
    </div>
  </div>
  )
}
