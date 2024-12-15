import { Link } from "react-router-dom";
import { useGetBanner } from "./service/query/useGetBanner"
import { Button, Image, message, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useDeleteBanner } from "./service/mutation/useDeleteBanner";

export const BannerList = () => {
  const { data } = useGetBanner()
  const { mutate } = useDeleteBanner()

  const Delete = (id: number) => { 
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
      image: item.image,
      title: item.title,
      description: item.description
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
      dataIndex: "image",
      key: "image",
      render: (image) =>
        <Image src={image} alt="category" width={80} height={70}/>
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div>
          <Link to={`/app/banner-list/edit/${record.id}`} >
            <Button type="primary">Edit</Button>
          </Link>
          <Button type="primary" onClick={() => Delete(record.id)}>Delete</Button>
        </div>
      ),
    }
  ];

  return (
    <div className="table-wrapper">
      <Link to={'/app/banner-list/create'}>
        <Button type="primary" variant="dashed">Create</Button>
      </Link>
      <div style={{ marginTop: '20px' }}>
        <Table style={{ scrollbarWidth: 'auto' }} columns={columns} dataSource={dataSource} />
      </div>
    </div>
  )
}
