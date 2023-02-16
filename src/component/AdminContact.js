import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CarryOutOutlined, ClearOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Table, Typography } from 'antd';

import {
  createNewContact,
  deleteContact,
  getAllContacts,
  updateContact,
} from '../feature/admin_contact/AdminContactSlice';

const { Title } = Typography;

const AdminContact = () => {
  const dispatch = useDispatch();
  const [selectedRow, setSelectedRow] = React.useState([]);

  React.useEffect(() => {
    dispatch(getAllContacts());
  }, []);

  // Form
  const [form] = Form.useForm();

  const handleOnFinishCreate = async () => {
    const { address, district, city, phone, email } = form.getFieldValue();
    await dispatch(
      createNewContact({
        address,
        district,
        city,
        phone,
        email,
      })
    );
    await dispatch(getAllContacts());

    form.resetFields();
  };

  const handleOnFinishUpdate = async () => {
    const { address, district, city, phone, email } = form.getFieldValue();
    await dispatch(
      updateContact({
        id: selectedRow[0].id,
        address,
        district,
        city,
        phone,
        email,
      })
    );
    await dispatch(getAllContacts());

    setSelectedRow([]);
    form.resetFields();
  };

  const handleDeleteContact = async () => {
    await dispatch(
      deleteContact({
        id: selectedRow[0].id,
        address: selectedRow[0].address,
        district: selectedRow[0].district,
        city: selectedRow[0].city,
        phone: selectedRow[0].phone,
        email: selectedRow[0].email,
      })
    );
    await dispatch(getAllContacts());

    setSelectedRow([]);
    form.resetFields();
  };

  const handleClearForm = () => {
    form.resetFields();
  };

  // Data table
  const data = useSelector((state) => state.adminContactReducer.contacts);

  const columns = [
    { title: 'Address', dataIndex: 'address' },
    { title: 'District', dataIndex: 'district' },
    { title: 'City', dataIndex: 'city' },
    { title: 'Phone', dataIndex: 'phone' },
    { title: 'Email', dataIndex: 'email' },
  ];

  const onSelectChange = (key, newSelectedRow) => {
    setSelectedRow(newSelectedRow);
    const { address, district, city, phone, email } = newSelectedRow[0];
    form.setFieldsValue({ address, district, city, phone, email });
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
          Admin Contact Page
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
              Contact Info
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
              <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please input address!' }]}>
                <Input maxLength={50} />
              </Form.Item>
              <Form.Item
                label="District"
                name="district"
                rules={[{ required: true, message: 'Please input district!' }]}
              >
                <Input maxLength={50} />
              </Form.Item>
              <Form.Item label="City" name="city" rules={[{ required: true, message: 'Please input city!' }]}>
                <Input maxLength={50} />
              </Form.Item>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  { required: true, message: 'Please input phone!' },
                  { pattern: new RegExp(/\d{10}/), message: 'Phone number must be a string of 10 digits' },
                ]}
              >
                <Input maxLength={10} />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Please input email!' },
                  { type: 'email', message: 'Email pattern is not valid!' },
                ]}
              >
                <Input maxLength={50} />
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
                      onClick={handleDeleteContact}
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

export default AdminContact;
