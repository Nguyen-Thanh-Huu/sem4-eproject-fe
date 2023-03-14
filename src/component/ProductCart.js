import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ScheduleOutlined } from '@ant-design/icons';
import { Button, Col, notification, Row, Typography } from 'antd';

import { resetCart } from '../feature/cart/CartSlice';
import { createInvoice } from '../feature/invoice/InvoiceSlice';
import shoppingImage from '../images/shopping/shopping.webp';

import CartItem from './CartItem';
import StripeButton from './StripeButton';

const { Title } = Typography;

export const InvoiceStatus = {
  REQUEST_RECEIVED: 'Request Received',
  REJECTED: 'Rejected',
  ACCEPTED: 'Accepted',
  PAYMENT_RECEIVED: 'Payment Received',
  SERVICE_BEGAN: 'Service Began',
  SERVICE_COMPLETE: 'Service Complete',
};

const ProductCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartReducer.cartItems);
  const createdInvoiceId = useSelector((state) => state.invoiceReducer.createdInvoiceId);
  const user = useSelector((state) => state.userReducer.user);

  const invoiceTotalPrice = React.useMemo(() => {
    let sum = 0;
    cartItems.map((item) => (sum += item.totalprice));
    return sum;
  }, [cartItems]);

  const openNotification = () => {
    notification.info({
      message: `Please Sign In`,
      description: 'Only signed in client is able to create invoice!',
      placement: 'bottomRight',
    });
  };

  // const handleCreateInvoice = async () => {
  //   // const userid = localStorage.getItem('userid');

  //   const createat = new Date().toISOString();
  //   const status = InvoiceStatus.REQUEST_RECEIVED;

  //   let totalprice = 0;
  //   cartItems.map((item) => (totalprice += parseInt(item.totalprice)));

  //   await dispatch(
  //     createInvoice({ createat, status, totalprice, userid: '165b9d2d-1bc7-4d82-a092-25719354011a', cartItems })
  //   );
  //   dispatch(resetCart());

  //   // if (userid) {
  //   //   const createat = new Date().toISOString();
  //   //   const status = InvoiceStatus.REQUEST_RECEIVED;

  //   //   let totalprice = 0;
  //   //   cartItems.map((item) => (totalprice += parseInt(item.totalprice)));

  //   //   await dispatch(createInvoice({ createat, status, totalprice, userid, cartItems }));
  //   //   dispatch(resetCart());
  //   // } else {
  //   //   openNotification();
  //   // }
  // };

  return (
    <div style={{ backgroundColor: '#faf1e2' }}>
      <Row>
        {cartItems.length > 0 ? (
          <Col span={24}>
            <Title
              level={2}
              style={{
                marginLeft: '16rem',
                marginTop: '4rem',
                fontSize: '3.5rem',
                fontWeight: 'bolder',
                color: '#023a21',
              }}
            >
              Order List
            </Title>
            <Row gutter={25} justify="center" style={{ marginBottom: 32, marginTop: 32 }}>
              <Col span={3}></Col>
              <Col span={5}>
                <Title
                  level={4}
                  style={{
                    fontSize: '1.7rem',
                    fontWeight: 'bolder',
                    color: '#023a21',
                  }}
                >
                  Product Name
                </Title>
              </Col>
              <Col span={3}>
                <Title
                  level={4}
                  style={{
                    fontSize: '1.7rem',
                    fontWeight: 'bolder',
                    color: '#023a21',
                  }}
                >
                  Unit Price
                </Title>
              </Col>
              <Col span={3}>
                <Title
                  level={4}
                  style={{
                    fontSize: '1.7rem',
                    fontWeight: 'bolder',
                    color: '#023a21',
                  }}
                >
                  Quantity
                </Title>
              </Col>
              <Col span={4}>
                <Title
                  level={4}
                  style={{
                    fontSize: '1.7rem',
                    fontWeight: 'bolder',
                    color: '#023a21',
                  }}
                >
                  Total
                </Title>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                {cartItems.map((item) => (
                  <div key={item.id}>
                    <CartItem item={item} />
                  </div>
                ))}
              </Col>
            </Row>

            <Row
              justify="center"
              gutter={300}
              style={{
                marginTop: '3rem',
              }}
            >
              <Col>
                {localStorage.getItem('userAddress') ? (
                  <>
                    <Title
                      level={2}
                      style={{
                        fontSize: '3.5rem',
                        fontWeight: 'bolder',
                        color: '#023a21',
                      }}
                    >
                      Shipping Address
                    </Title>
                    <Title level={4}>Address: {localStorage.getItem('userAddress')}</Title>
                    <Title level={4}>District: {localStorage.getItem('userDistrict')}</Title>
                    <Title level={4}>City: {localStorage.getItem('userCity')}</Title>
                  </>
                ) : null}
              </Col>
              <Col>
                <Title
                  level={2}
                  style={{
                    fontSize: '3.5rem',
                    fontWeight: 'bolder',
                    color: '#023a21',
                  }}
                >
                  Total Price
                </Title>
                <Title
                  style={{
                    color: '#D65D0E',
                    fontWeight: 'bolder',
                    textAlign: 'left',
                  }}
                >
                  {invoiceTotalPrice} USD
                </Title>
                <Row style={{ marginTop: 16, marginBottom: 128 }}>
                  <StripeButton price={invoiceTotalPrice} />
                  {/* <Button type="primary" shape="round" onClick={handleCreateInvoice} icon={<ScheduleOutlined />}>
              Create Order
            </Button> */}
                </Row>
              </Col>
            </Row>
          </Col>
        ) : (
          <Col span={24}>
            <Row justify="center" style={{ marginTop: '4rem', marginBottom: '4rem' }}>
              <Col>
                <Row justify="center">
                  <Title
                    style={{
                      color: '#076678',
                      fontSize: '4rem',
                      fontWeight: 'bolder',
                      textAlign: 'center',
                      textShadow: '6px 6px 0px rgba(131,165,152,0.7)',
                    }}
                  >
                    {!createdInvoiceId ? 'Please go shopping first!' : 'The cart is empty now!'}
                  </Title>
                </Row>
                <Row justify="center">
                  <img
                    src={shoppingImage}
                    width={600}
                    height={400}
                    style={{
                      boxShadow: '10px 10px 0px rgba(131,165,152,0.7)',
                      borderStyle: 'solid',
                      borderWidth: '1px',
                      borderColor: 'rgba(131,165,152,0.7)',
                    }}
                  />
                </Row>
              </Col>
            </Row>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default ProductCart;
