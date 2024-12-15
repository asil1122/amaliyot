import { Button, Image, message, Table } from "antd"
import { ColumnsType } from "antd/es/table"
import { Link } from "react-router-dom"
import { useGetProduct } from "./service/query/useGetProduct"
import { useProductDelete } from "./service/mutation/useProductDelete"
import { SearchProduct } from "./search-product/search-product"

export const ProductList = () => {
  const { mutate } = useProductDelete()
  const { data, isLoading,  } = useGetProduct()
  
  const deleteProduct = (id: number) => {
    mutate(id, {
      onSuccess: () => {
        message.success('Successfully deleted')
      }
    })
  }

  const dataSource = data?.results.map((item) => {
    return {
      key: item.id,
      id: item.id,
      image: item.image,
      title: item.title,
    }
  }) || []


  const columns: ColumnsType = [
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: 'IMG',
        dataIndex: 'image',
        key: 'image',
        render: (image) => <Image src={image} alt="img" width={80} height={70}/>,
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
        render: (_, record) => (
          <div>
            <Link to={`/app/product-list/edit/${record.id}`}>
              <Button type="primary">Edit</Button>
            </Link>
            <Button type="primary" onClick={() => deleteProduct(record.id)}>Delete</Button>
            <Link to={`/app/product-list/variants/${record.id}`}>
              <Button type="primary">Variants</Button>
            </Link>
          </div>
        )
    }
]
                      
  return (
    <div className="table-wrapper">
      <SearchProduct/>
      <Link to={'/app/product-list/create'}>
        <Button type="primary" variant="dashed">Create</Button>
      </Link>
      <div style={{ marginTop: '20px' }}>
        <Table style={{scrollbarWidth: 'auto'}} loading={isLoading} columns={columns}  dataSource={dataSource} />
      </div>
    </div>
  )
}
