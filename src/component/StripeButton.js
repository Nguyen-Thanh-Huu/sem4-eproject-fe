import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { notification } from 'antd';
import axios from 'axios';

import { resetCart } from '../feature/cart/CartSlice';
import { createInvoice } from '../feature/invoice/InvoiceSlice';

import { InvoiceStatus } from './ProductCart';

const StripeButton = ({ price }) => {
  const paymentUrl = 'http://localhost:8080/api/v1/payment';
  const publicKey =
    'pk_test_51Mg6kqExTKEZVeFvXIV2X41KTKjoDH4Xtpw92S6gEpvM9Y9N6K0MAKIov3gyCb1T0itVw6CjA2IdH7FJg1V1rgbG00JTxZKX3E';
  const stripePrice = price * 100;

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartReducer.cartItems);

  const openNotification = () => {
    notification.info({
      message: `Payment fail`,
      description: 'Something wrong with payment process. Please try again later!',
      placement: 'bottomRight',
    });
  };

  const handleCreateInvoice = async () => {
    const userid = localStorage.getItem('userid');

    // const createat = new Date().toISOString();
    // const status = InvoiceStatus.REQUEST_RECEIVED;

    // let totalprice = 0;
    // cartItems.map((item) => (totalprice += parseInt(item.totalprice)));

    // await dispatch(
    //   createInvoice({ createat, status, totalprice, userid: '165b9d2d-1bc7-4d82-a092-25719354011a', cartItems })
    // );
    // dispatch(resetCart());

    if (userid) {
      const createat = new Date().toISOString();
      const status = InvoiceStatus.REQUEST_RECEIVED;

      let totalprice = 0;
      cartItems.map((item) => (totalprice += parseInt(item.totalprice)));

      await dispatch(createInvoice({ createat, status, totalprice, userid, cartItems }));
      dispatch(resetCart());
    } else {
      openNotification();
    }
  };

  const onToken = async (token) => {
    const response = await axios({
      method: 'post',
      url: paymentUrl,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        amount: price,
        token: token.id,
      },
    });

    if (response.data.status === 'ok') {
      handleCreateInvoice();
    }

    if (response.data.status === 'fail') {
      openNotification();
    }
  };

  return (
    <StripeCheckout
      amount={stripePrice}
      label="Pay Now"
      description={`Your total is ${price} USD`}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publicKey}
      currency="USD"
    />
  );
};

export default StripeButton;
