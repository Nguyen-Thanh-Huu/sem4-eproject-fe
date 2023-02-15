import React from 'react';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';
import {
  CarryOutOutlined,
  ClearOutlined,
  DeleteOutlined,
  PlusOutlined,
  SearchOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select, Space, Table, Typography, Upload } from 'antd';

import {
  createNewProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from '../feature/admin_product/AdminProductSlice';
import { getAllCategories } from '../feature/category/CategorySlice';

const { Title } = Typography;

const AdminProduct = () => {
  const dispatch = useDispatch();
  // Data table
  const data = useSelector((state) => state.adminProductReducer.products);
  const categories = useSelector((state) => state.categoryReducer.categories);

  const [selectedRow, setSelectedRow] = React.useState([]);

  React.useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategories());
  }, []);

  // Form
  const [form] = Form.useForm();

  const handleOnFinishCreate = async () => {
    const values = form.getFieldValue();

    values.image = '';
    await values.upload.map(({ originFileObj }) => {
      const reader = new FileReader();
      reader.onload = async function (evt) {
        values.image += evt.target.result;
        const { name, price, image, description, categoryid, alcohol } = values;

        await dispatch(
          createNewProduct({
            name,
            price,
            image,
            description,
            categoryid,
            alcohol,
          })
        );
        await dispatch(getAllProducts());
        await dispatch(getAllCategories());

        form.resetFields();
      };
      reader.readAsDataURL(originFileObj);
    });
  };

  const handleOnFinishUpdate = async () => {
    const values = form.getFieldValue();
    values.image = '';

    if (values.upload) {
      await values.upload.map(({ originFileObj }) => {
        const reader = new FileReader();
        reader.onload = async function (evt) {
          values.image += evt.target.result;
          const { name, price, image, description, categoryid, alcohol } = values;

          await dispatch(
            updateProduct({
              id: selectedRow[0].id,
              name,
              price,
              image,
              description,
              categoryid,
              alcohol,
            })
          );
          await dispatch(getAllProducts());
          await dispatch(getAllCategories());

          form.resetFields();
        };
        reader.readAsDataURL(originFileObj);
      });
    } else {
      const { name, price, image, description, categoryid, alcohol } = values;

      await dispatch(
        updateProduct({
          id: selectedRow[0].id,
          name,
          price,
          image,
          description,
          categoryid,
          alcohol,
        })
      );
      await dispatch(getAllProducts());
      await dispatch(getAllCategories());

      setSelectedRow([]);
      form.resetFields();
    }
  };

  const handleDeleteProduct = async () => {
    const { id, name, price, image, description, categoryid, alcohol } = selectedRow[0];
    await dispatch(deleteProduct({ id, name, price, image, description, categoryid, alcohol }));
    await dispatch(getAllProducts());
    await dispatch(getAllCategories());

    setSelectedRow([]);
    form.resetFields();
  };

  const handleClearForm = () => {
    form.resetFields();
  };

  // Do not change this
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }

    return e?.fileList;
  };

  // Table

  const [searchText, setSearchText] = React.useState('');
  const [searchedColumn, setSearchedColumn] = React.useState('');
  const searchInput = React.useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          {/* <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button> */}
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
      sorter: (a, b) => a.name.localeCompare(b.name),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: (a, b) => a.price - b.price,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Category',
      dataIndex: 'category',
      sorter: (a, b) => a.category.localeCompare(b.category),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Alcohol',
      dataIndex: 'alcohol',
      sorter: (a, b) => a.alcohol.localeCompare(b.alcohol),
      sortDirections: ['descend', 'ascend'],
    },
  ];

  const onSelectChange = (key, newSelectedRow) => {
    setSelectedRow(newSelectedRow);
    const { name, price, image, description, categoryid, alcohol } = newSelectedRow[0];
    form.setFieldsValue({ name, price, image, description, categoryid, alcohol });
  };

  const rowSelection = {
    type: 'radio',
    onChange: onSelectChange,
  };

  return (
    <div style={{ padding: 16 }}>
      <Row justify="center">
        <Title
          style={{
            color: '#076678',
            fontSize: '3rem',
            fontWeight: 'bolder',
            textAlign: 'left',
            textShadow: '4px 4px 0px rgba(131,165,152,0.7)',
          }}
        >
          Admin Product Page
        </Title>
      </Row>

      <Col span={24}>
        <Row justify="center" gutter={16}>
          <Col span={16}>
            <Title level={4} style={{ color: '#D65D0E' }}>
              Data Table
            </Title>

            <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
          </Col>
          <Col span={8}>
            <Title level={4} style={{ color: '#D65D0E' }}>
              Product Info
            </Title>

            <Form
              form={form}
              name="basic"
              layout="vertical"
              initialValues={{ remember: true }}
              autoComplete="off"
              labelCol={{
                span: 22,
                offset: 0,
              }}
              wrapperCol={{
                span: 22,
                offset: 0,
              }}
              onFinish={selectedRow.length > 0 ? handleOnFinishUpdate : handleOnFinishCreate}
            >
              <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input product name!' }]}>
                <Input />
              </Form.Item>

              <Form.Item
                label="Price"
                name="price"
                rules={[{ required: true, message: 'Please input product price!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Description"
                name="description"
                rules={[{ required: true, message: 'Please input product description!' }]}
              >
                <Input.TextArea showCount maxLength={500} />
              </Form.Item>

              <Form.Item
                label="Select Category"
                name="categoryid"
                rules={[{ required: true, message: 'Please select product domain!' }]}
              >
                <Select>
                  {categories
                    ? categories.map((category) => (
                        <Select.Option value={category.id} key={category.id}>
                          {category.name}
                        </Select.Option>
                      ))
                    : null}
                </Select>
              </Form.Item>

              <Form.Item
                label="Alcohol"
                name="alcohol"
                rules={[{ required: true, message: 'Please input alcohol level!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item name="upload" label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
                <Upload name="logo" listType="picture">
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
              </Form.Item>

              <Col>
                <Row justify="space-evenly">
                  <Form.Item wrapperCol={{ span: 24, offset: 0 }}>
                    <Button
                      type="primary"
                      shape="round"
                      block
                      icon={<PlusOutlined />}
                      style={{ width: '7rem' }}
                      onClick={handleOnFinishCreate}
                    >
                      New
                    </Button>
                  </Form.Item>

                  <Form.Item wrapperCol={{ span: 24, offset: 0 }}>
                    <Button
                      danger
                      type="primary"
                      shape="round"
                      htmlType="button"
                      block
                      icon={<ClearOutlined />}
                      onClick={handleClearForm}
                      style={{ width: '7rem' }}
                    >
                      Clear
                    </Button>
                  </Form.Item>
                </Row>
                <Row justify="space-evenly">
                  <Form.Item wrapperCol={{ span: 24, offset: 0 }}>
                    <Button
                      type="primary"
                      shape="round"
                      block
                      icon={<CarryOutOutlined />}
                      style={{ width: '7rem' }}
                      onClick={handleOnFinishUpdate}
                    >
                      Update
                    </Button>
                  </Form.Item>

                  <Form.Item wrapperCol={{ span: 24, offset: 0 }}>
                    <Button
                      danger
                      type="primary"
                      shape="round"
                      htmlType="button"
                      block
                      icon={<DeleteOutlined />}
                      onClick={handleDeleteProduct}
                      style={{ width: '7rem' }}
                    >
                      Delete
                    </Button>
                  </Form.Item>
                </Row>
              </Col>
            </Form>
          </Col>
        </Row>
      </Col>
    </div>
  );
};

export default AdminProduct;
