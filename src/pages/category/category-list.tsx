import { Button, Table } from "antd"
import { useGetProducts } from "./service/query/useGetProducts";
import { Link } from "react-router-dom";
import { ColumnsType } from "antd/es/table";

// interface columnType {
//   title: string,
//   dataIndex: string,
//   key: string
// }


export const CategoryList = () => {
  const { data } = useGetProducts()
  
  console.log(data);
  

  const dataSource = data?.results.map((item)=>{
    
    return {
      key: item.id,
      id: item.id,
      img: item.image,
      title: item.title,
    }
  })

  const columns: ColumnsType = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
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
          <Button onClick={() => console.log(record)} htmlType="submit" type="primary">Delete</Button>
        </div>
    }
  ];

  return (
    <div className="table-wrapper">
      <Link to={'/app/create'}>
        <Button type="primary" variant="dashed">Create</Button>
      </Link>
      <div style={{ marginTop: '20px' }}>
        <Table style={{scrollbarWidth: 'auto'}} columns={columns}  dataSource={dataSource} />
      </div>
    </div>
  )
}
