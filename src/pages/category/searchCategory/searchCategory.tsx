import { Table, Image, Form, Input } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';
import { useSearchCategory } from '../service/query/useSearchCategory';

export const SearchCategory = () => {
  const [input, setInput] = useState('');
  const debounceValue = useDebounce(input);
  const { data, isLoading } = useSearchCategory(debounceValue);

  const dataSource = data?.results?.map((item) => ({
    key: item.id,
    id: item.id,
    img: item.image,
    title: item.title,
  })) || [];

  const columns: ColumnsType = [
    {
      title: 'Image',
      dataIndex: 'img',
      key: 'img',
      render: (img: string) => <Image src={img} alt="image" width={80} height={70} />,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
  ];

  return (
    <Form style={{ position: 'relative'}}>
      <Form.Item>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Search...'
        />
      </Form.Item>
      {isLoading ? (
        <h1>Loading.....</h1>
      ) : (
        dataSource.length > 0 && (
          <Table
            columns={columns}
            dataSource={dataSource}
            rowKey={(record) => record.id.toString()}
            pagination={false}
            style={{ position: 'absolute', top: '80px', width: '100%', zIndex: 5, backgroundColor: '#fff', boxShadow: "0px 0px 99px -9px rgba(161,137,161,1)" }}
          />
        )
      )}
    </Form>
  );
};
