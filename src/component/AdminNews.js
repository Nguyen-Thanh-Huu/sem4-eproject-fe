import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CarryOutOutlined, ClearOutlined, DeleteOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Table, Typography, Upload } from 'antd';

import { createNewNews, deleteNews, getAllNews, updateNews } from '../feature/admin_news/AdminNewsSlice';

const { Title } = Typography;

const AdminNews = () => {
  const dispatch = useDispatch();
  const [selectedRow, setSelectedRow] = React.useState([]);

  React.useEffect(() => {
    dispatch(getAllNews());
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
        const { image, content, title } = values;

        await dispatch(
          createNewNews({
            image,
            content,
            title,
          })
        );

        await dispatch(getAllNews());

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
          const { image, content, title } = values;

          await dispatch(
            updateNews({
              id: selectedRow[0].id,
              image,
              content,
              title,
            })
          );

          await dispatch(getAllNews());

          form.resetFields();
        };
        reader.readAsDataURL(originFileObj);
      });
    } else {
      const { image, content, title } = values;

      await dispatch(
        updateNews({
          id: selectedRow[0].id,
          image,
          content,
          title,
        })
      );

      await dispatch(getAllNews());

      setSelectedRow([]);
      form.resetFields();
    }
  };

  const handleDeleteNews = async () => {
    await dispatch(
      deleteNews({
        id: selectedRow[0].id,
        image: selectedRow[0].image,
        content: selectedRow[0].content,
        title: selectedRow[0].title,
      })
    );
    await dispatch(getAllNews());

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
  const data = useSelector((state) => state.adminNewsReducer.news);

  const columns = [
    {
      title: 'Create At',
      dataIndex: 'createat',
      render: (t, r) => <span>{`${new Date(r.createat).toLocaleString()}`} </span>,
    },
    { title: 'Image', dataIndex: 'image', render: (t, r) => <img width={100} src={`${r.image}`} /> },
    { title: 'Content', dataIndex: 'content' },
    { title: 'Title', dataIndex: 'title' },
  ];

  const onSelectChange = (key, newSelectedRow) => {
    setSelectedRow(newSelectedRow);
    const { createat, image, content, title } = newSelectedRow[0];
    form.setFieldsValue({ createat, image, content, title });
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
          Admin News Page
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
              News Info
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
              <Form.Item name="upload" label="Upload" valuePropName="fileList" getValueFromEvent={normFile}>
                <Upload name="logo" listType="picture">
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload>
              </Form.Item>
              <Form.Item label="Content" name="content" rules={[{ required: true, message: 'Please input content!' }]}>
                <Input.TextArea showCount rows={10} maxLength={2000} />
              </Form.Item>
              <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please input title!' }]}>
                <Input.TextArea showCount rows={2} maxLength={500} />
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
                      onClick={handleDeleteNews}
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

export default AdminNews;
