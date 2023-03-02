import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { SendOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Col, Divider, Form, Image, Input, Row, Spin, Typography } from 'antd';

import { addToCart } from '../feature/cart/CartSlice';
import { getAllCategories } from '../feature/category/CategorySlice';
import { createNewFeedback, getAllByProductId } from '../feature/feedback/FeedbackSlice';
import { getProductById } from '../feature/product/ProductSlice';

const { Title, Text } = Typography;

const ProductDetail = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const productDetail = useSelector((state) => state.productReducer.productDetail);
  const categories = useSelector((state) => state.categoryReducer.categories);
  const feedbacks = useSelector((state) => state.feedbackReducer.feedbacks);

  const [feedbackValue, setFeedbackValue] = React.useState('');

  React.useEffect(() => {
    dispatch(getProductById({ id: params.productId }));
    dispatch(getAllCategories());
    dispatch(getAllByProductId({ id: params.productId }));
  }, []);

  const handleAddToCart = () => {
    dispatch(addToCart(productDetail));
  };

  const handleFeedbackChange = (e) => {
    setFeedbackValue(e.target.value);
  };

  const handleCreateFeedback = async () => {
    await dispatch(
      createNewFeedback({
        userId: localStorage.getItem('userid'),
        content: feedbackValue,
        createat: new Date().toISOString(),
        productId: productDetail.id,
        firstName: localStorage.getItem('userFirstname'),
        lastName: localStorage.getItem('userLastname'),
        deleted: false,
      })
    );
    setFeedbackValue('');
    await dispatch(getAllByProductId({ id: params.productId }));
  };

  return (
    <div style={{ backgroundColor: '#faf1e2' }}>
      <div style={{ margin: 'auto', width: '90%', padding: '5rem 0' }}>
        {productDetail && categories ? (
          <Row gutter={16}>
            <Row style={{ margin: 'auto' }}>
              <Col span={8}>
                <Image height={'680px'} width={'350px'} src={productDetail.image} />
              </Col>
              <Col span={16}>
                <Row justify="space-between">
                  <Col span={18}>
                    <Title style={{ color: '#d06539' }}>{productDetail.name}</Title>
                  </Col>
                  <Col span={6} align="end">
                    <Title style={{ color: '#d06539' }}>${productDetail.price}</Title>
                  </Col>
                </Row>
                <Divider
                  style={{
                    borderColor: '#023a21',
                    borderWidth: '0.1rem',
                  }}
                />

                <Row style={{ paddingTop: '1.5rem' }}>
                  <Col span={12}>
                    <Title level={4} style={{ color: '#023a21' }}>
                      Category:
                    </Title>
                    <Title level={5} style={{ color: '#023a21' }}>
                      {categories.find((item) => item.id === productDetail.categoryid).name}
                    </Title>
                  </Col>
                  <Col span={12}>
                    <Title level={4} style={{ color: '#023a21' }}>
                      Alcohol:
                    </Title>
                    <Title level={5} style={{ color: '#023a21' }}>
                      {productDetail.alcohol}
                    </Title>
                  </Col>
                </Row>

                <Row style={{ paddingTop: '1.5rem' }}>
                  <Card
                    title="Detail Information"
                    style={{
                      width: '100%',
                      backgroundColor: '#faf1e2',
                      borderColor: '#023a21',
                    }}
                  >
                    <p>{productDetail.description}</p>
                  </Card>
                </Row>
                <Row style={{ marginTop: 16, marginBottom: 16, paddingTop: '1.5rem' }}>
                  <Button
                    type="primary"
                    shape="round"
                    onClick={handleAddToCart}
                    style={{ background: '#d06539', borderColor: '#d06539' }}
                  >
                    Add to Cart
                  </Button>
                </Row>
              </Col>
            </Row>

            <Row style={{ marginLeft: 40, marginBottom: 40, width: '100%', paddingTop: '3rem' }}>
              <Col span={24}>
                <Row style={{ width: '100%' }}>
                  <Title level={2} style={{ color: '#d06539' }}>
                    Feedbacks
                  </Title>
                </Row>
                {localStorage.getItem('userid') ? (
                  <Row>
                    <Form.Item style={{ width: '100%' }}>
                      <Input.TextArea showCount maxLength={250} value={feedbackValue} onChange={handleFeedbackChange} />
                    </Form.Item>
                    <Form.Item>
                      <Button
                        type="primary"
                        shape="round"
                        htmlType="button"
                        onClick={handleCreateFeedback}
                        icon={<SendOutlined />}
                        style={{ background: '#d06539', borderColor: '#d06539' }}
                      >
                        Send Feedback
                      </Button>
                    </Form.Item>
                  </Row>
                ) : null}
                <Row>
                  <Col>
                    {feedbacks ? (
                      feedbacks.map((feedback) => (
                        <Col key={feedback.id} style={{ marginBottom: '1.5rem' }}>
                          <Row align="middle">
                            <Avatar style={{ backgroundColor: '#1890ff' }}>{feedback.firstName.charAt(0)}</Avatar>
                            <Title level={5} style={{ marginLeft: '1rem' }}>
                              {feedback.firstName + ' ' + feedback.lastName}
                            </Title>
                          </Row>
                          <Text level={6}>{feedback.content}</Text>
                        </Col>
                      ))
                    ) : (
                      <Row justify="center">
                        <Spin size="large" />
                      </Row>
                    )}
                  </Col>
                </Row>
              </Col>
            </Row>
          </Row>
        ) : (
          <Row justify="center">
            <Spin size="large" />
          </Row>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
