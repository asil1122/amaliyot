import { Button, message, Table } from "antd"
import { ColumnsType } from "antd/es/table";
import { useGetSubCategory } from "./service/query/useGetSubCategory";
import { useDeleteItems } from "../category/service/mutation/useDeleteItems";
import { Link } from "react-router-dom";

export const SubCategory = () => {
  const { data } = useGetSubCategory()
  const { mutate } = useDeleteItems()
  
  console.log('subbbbbbbbbbbb',data);

  const deleteUser = (id: number) => {
    console.log(id);
    
    mutate(id, {
      onSuccess: () => {
        message.success("Successfully deleted!");
      }
    })
  }
  
  console.log(data?.results,'aaaaaaadddddddddddddaaaaaaaaaaadddddddddd');
  

  const dataSource = data?.results?.map((item)=>{
    
    return {
      key: item.id,
      id: item.id,
      img: item.image,
      title: item.title,
      parent: item.parent?.title

    }
  })

  const columns: ColumnsType = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Parent',
      dataIndex: 'parent',
      key: 'parent',
    },
    {
      title: 'IMG',
      dataIndex: 'img',
      key: 'img',
      render: (image) =>
          <img src={image} alt="category" style={{ width: 80, height: 70 }} />
    },
    {
      title: 'Name',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Change',
      dataIndex: 'change',
      key: 'change',
      render: (_,record) => 
        <div>
          <Button onClick={() => deleteUser(record.id)} htmlType="submit" type="primary">Delete</Button>
          <Link to={`/app/sub-category/edit/${record.id}`}>
              <Button htmlType="submit" type="primary">Edit</Button>
          </Link>
        </div>
    }
  ];

  return (
    <div className="table-wrapper">
      <Link to={'/app/sub-category/create'}>
        <Button type="primary" variant="dashed">Create</Button>
      </Link>
      <div style={{ marginTop: '20px' }}>
        <Table style={{scrollbarWidth: 'auto'}} columns={columns}  dataSource={dataSource} />
      </div>
    </div>
  )
}
