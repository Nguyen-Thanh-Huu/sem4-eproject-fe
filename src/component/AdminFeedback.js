import React from 'react';
import Highlighter from 'react-highlight-words';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Select, Space, Table, Typography } from 'antd';

import { deleteFeedback, getAllFeedbacks } from '../feature/admin_feedback/AdminFeedbackSlice';
import { getAllProducts } from '../feature/admin_product/AdminProductSlice';
import { getAllUsers } from '../feature/admin_user/AdminUserSlice';

const { Title } = Typography;

const AdminFeedback = () => {
  const dispatch = useDispatch();
  // Data table
  const data = useSelector((state) => state.adminFeedbackReducer.feedbacks);
  const products = useSelector((state) => state.productReducer.products);
  const users = useSelector((state) => state.adminUserReducer.users);

  const [selectedRow, setSelectedRow] = React.useState([]);

  React.useEffect(() => {
    dispatch(getAllFeedbacks());
    dispatch(getAllProducts());
    dispatch(getAllUsers());
  }, []);

  // Form
  const [form] = Form.useForm();

  const handleDeleteProduct = async () => {
    await dispatch(deleteFeedback({ id: selectedRow[0].id }));
    await dispatch(getAllFeedbacks());
    await dispatch(getAllProducts());
    await dispatch(getAllUsers());

    setSelectedRow([]);
    form.resetFields();
  };

  // Table
  const columns = [
    {
      title: 'UserName',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Product',
      dataIndex: 'product',
    },
    {
      title: 'Content',
      dataIndex: 'content',
    },
  ];

  const onSelectChange = (key, newSelectedRow) => {
    setSelectedRow(newSelectedRow);
    const { userId, content, productId, firstName, lastName } = newSelectedRow[0];
    form.setFieldsValue({ userId, content, productId, firstName, lastName });
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
          Admin Feedback Page
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
              Feedback Info
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
            >
              <Col>
                <Row>
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

export default AdminFeedback;
