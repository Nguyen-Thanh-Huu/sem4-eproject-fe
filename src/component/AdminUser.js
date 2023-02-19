import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CarryOutOutlined, ClearOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Table, Typography } from 'antd';

import {
  createNewUser,
  deleteUser,
  getAllUsers,
  updateUser,
  updateUserWithoutPassword,
} from '../feature/admin_user/AdminUserSlice';

const { Title } = Typography;
const AdminUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [reloadDataTable, setReloadDataTable] = React.useState(true);
  const [selectedRow, setSelectedRow] = React.useState([]);
  const users = useSelector((state) => state.userReducer.users);

  React.useEffect(() => {
    dispatch(getAllUsers());
  }, [reloadDataTable]);

  // Form
  const [form] = Form.useForm();

  const handleOnFinishCreate = async () => {
    const { firstname, lastname, address, district, city, role, phone, email, password } = form.getFieldsValue();
    await dispatch(
      createNewUser({
        firstname,
        lastname,
        address,
        district,
        city,
        role,
        phone,
        email,
        password,
      })
    );
    await dispatch(getAllUsers());

    form.resetFields();
  };

  const handleOnFinishUpdate = async () => {
    const { firstname, lastname, address, district, city, role, phone, email } = form.getFieldValue();
    // if (password) {
    await dispatch(
      updateUser({
        id: selectedRow[0].id,
        firstname,
        lastname,
        address,
        district,
        city,
        role,
        phone,
        email,
      })
    );
    // } else {
    //   await dispatch(
    //     updateUserWithoutPassword({
    //       id: selectedRow[0].id,
    //       firstname,
    //       lastname,
    //       address,
    //       district,
    //       city,
    //       role,
    //       phone,
    //       email,
    //     })
    //   );
    // }

    await dispatch(getAllUsers());

    setSelectedRow([]);
    form.resetFields();
  };

  const handleDeleteUser = async () => {
    await dispatch(
      deleteUser({
        id: selectedRow[0].id,
        firstname: selectedRow[0].firstname,
        lastname: selectedRow[0].lastname,
        address: selectedRow[0].address,
        district: selectedRow[0].district,
        city: selectedRow[0].city,
        phone: selectedRow[0].phone,
        email: selectedRow[0].email,
        password: selectedRow[0].password,
      })
    );
    await dispatch(getAllUsers());

    setSelectedRow([]);
    form.resetFields();
  };

  // Do not change this
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }

    return e?.fileList;
  };

  const handleClearForm = () => {
    form.resetFields();
  };

  // Data table
  const data = useSelector((state) => state.adminUserReducer.users);

  const columns = [
    { title: 'First Name', dataIndex: 'firstname' },
    { title: 'Last Name', dataIndex: 'lastname' },
    { title: 'Address', dataIndex: 'address' },
    { title: 'District', dataIndex: 'district' },
    { title: 'City', dataIndex: 'city' },
    { title: 'Role', dataIndex: 'role' },
    { title: 'Phone', dataIndex: 'phone' },
    { title: 'Email', dataIndex: 'email' },
  ];

  const onSelectChange = (key, newSelectedRow) => {
    setSelectedRow(newSelectedRow);
    const { firstname, lastname, address, district, city, role, phone, email } = newSelectedRow[0];
    form.setFieldsValue({ firstname, lastname, address, district, city, role, phone, email });
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
          Admin User Page
        </Title>
      </Row>

      <Row>
        <Col span={24}>
          <Title level={4} style={{ color: '#D65D0E' }}>
            Data Table
          </Title>
        </Col>
        <Col span={24}>
          <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Title level={4} style={{ color: '#D65D0E' }}>
            User Info
          </Title>
        </Col>
      </Row>
      <Row justify="center">
        <Col span={14}>
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
            <Form.Item
              label="First Name"
              name="firstname"
              rules={[{ required: true, message: 'Please input first name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Last Name"
              name="lastname"
              rules={[{ required: true, message: 'Please input last name!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please input address!' }]}>
              <Input />
            </Form.Item>

            <Form.Item label="District" name="district" rules={[{ required: true, message: 'Please input district!' }]}>
              <Input />
            </Form.Item>

            <Form.Item label="City" name="city" rules={[{ required: true, message: 'Please input city!' }]}>
              <Input />
            </Form.Item>

            <Form.Item label="Role" name="role" rules={[{ required: true, message: 'Please input role!' }]}>
              <Input />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                { required: true, message: 'Please input phone!' },
                { pattern: new RegExp(/\d{10}/), message: 'Phone number must be a string of 10 digits' },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please input an email!' },
                { type: 'email', message: 'Email pattern is not valid!' },
              ]}
            >
              <Input />
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
                    onClick={handleDeleteUser}
                    style={{ width: '7rem' }}
                  >
                    Delete
                  </Button>
                </Form.Item>
              </Row>
            </Col>
            {/* {selectedRow.length > 0 ? (
              <Row justify="space-evenly">
                <Form.Item wrapperCol={{ span: 24, offset: 0 }}>
                  <Button type="primary" shape="round" htmlType="submit" block icon={<CarryOutOutlined />}>
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
                    icon={<CarryOutOutlined />}
                    onClick={handleDeleteUser}
                  >
                    Delete
                  </Button>
                </Form.Item>
                <Form.Item wrapperCol={{ span: 24, offset: 0 }}>
                  {users ? (
                    users.map((user) => (
                      <Button
                        key={user.id}
                        type="primary"
                        shape="round"
                        htmlType="button"
                        block
                        icon={<CarryOutOutlined />}
                        onClick={() => navigate(user.id)}
                      >
                        Change Password
                      </Button>
                    ))
                  ) : (
                    <Row justify="center"></Row>
                  )}
                </Form.Item>
              </Row>
            ) : (
              <Form.Item wrapperCol={{ span: 22, offset: 0 }}>
                <Button type="primary" shape="round" htmlType="submit" block icon={<CarryOutOutlined />}>
                  Create User
                </Button>
              </Form.Item>
            )} */}
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default AdminUser;
