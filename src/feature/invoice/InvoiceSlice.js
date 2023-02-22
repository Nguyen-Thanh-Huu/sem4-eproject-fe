import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { resetCart } from '../cart/CartSlice';

const createInvoiceUrl = 'http://localhost:8080/api/v1/insert-invoice';
const createInvoiceitemUrl = 'http://localhost:8080/api/v1/insert-invoice-item';
const getAllInvoiceUrl = 'http://localhost:8080/api/v1/invoices';
const getAllInvoiceByUserIdUrl = 'http://localhost:8080/api/v1/invoice-by-user-id';
const updateInvoiceUrl = 'http://localhost:8080/api/v1/update-invoice';

const initialState = {
  createdInvoiceId: '',
  invoices: null,
  invoicesByUserId: null,
  updateInvoiceStatus: '',
};

export const createInvoice = createAsyncThunk(
  '/api/v1/insert-invoice',
  async ({ createat, totalprice, status, userid, cartItems }, thunkApi) => {
    const response = await axios({
      method: 'post',
      url: createInvoiceUrl,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: { id: '', createat, totalprice, status, userid, deleted: false },
    });

    cartItems.map((item) =>
      createInvoiceitem({
        invoiceid: response.data.responseObject.id,
        productid: item.id,
        quantity: item.quantity,
        totalprice: item.totalprice,
      })
    );

    return response.data.responseObject;
  }
);

export const createInvoiceitem = async ({ invoiceid, productid, quantity, totalprice }) => {
  await axios({
    method: 'post',
    url: createInvoiceitemUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: { id: '', invoiceid, productid, quantity, totalprice, deleted: false },
  });
};

export const getAllInvoices = createAsyncThunk('/api/v1/invoices', async (thunkApi) => {
  const response = await axios({
    method: 'get',
    url: getAllInvoiceUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  response.data.responseObject.map((item) => (item.key = item.id));

  return response.data.responseObject;
});

export const getAllInvoicesByUserId = createAsyncThunk('/api/v1/invoice-by-user-id', async ({ id }, thunkApi) => {
  const response = await axios({
    method: 'post',
    url: getAllInvoiceByUserIdUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: { id },
  });

  response.data.responseObject.map((item) => (item.key = item.id));

  return response.data.responseObject;
});

export const updateInvoice = createAsyncThunk(
  '/api/v1/update-invoice',
  async ({ id, createat, totalprice, status, userid }, thunkApi) => {
    const response = await axios({
      method: 'put',
      url: updateInvoiceUrl,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: { id, createat, totalprice, status, userid, deleted: false },
    });

    return response.data.responseObject;
  }
);

export const invoiceSlice = createSlice({
  name: 'invoiceSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createInvoice.fulfilled, (state, action) => {
      state.createdInvoiceId = action.payload.id;
    });
    builder.addCase(getAllInvoices.fulfilled, (state, action) => {
      state.invoices = action.payload;
    });
    builder.addCase(getAllInvoicesByUserId.fulfilled, (state, action) => {
      state.invoicesByUserId = action.payload;
    });
    builder.addCase(updateInvoice.fulfilled, (state, action) => {
      state.updateInvoiceStatus = action.payload;
    });
  },
});

export default invoiceSlice.reducer;
