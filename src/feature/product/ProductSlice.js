import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const getAllProductsUrl = 'http://localhost:8080/api/v1/products';
const getProductByIdUrl = 'https://localhost:44302/api/product/';
const getProductByNameUrl = 'https://localhost:44302/api/product/searchbyname';
const filterProductByDomainUrl = 'https://localhost:44302/api/product/filterbydomainid';
const filterProductByServiceUrl = 'https://localhost:44302/api/product/filterbyserviceid';

const getAllCategoriesUrl = 'http://localhost:8080/api/v1/categories';

const initialState = {
  products: null,
  productDetail: null,
};

export const getAllProducts = createAsyncThunk('/api/v1/products', async (thunkApi) => {
  const response = await axios({
    method: 'get',
    url: getAllProductsUrl,
  });

  const responseCategories = await axios({
    method: 'get',
    url: getAllCategoriesUrl,
  });

  response.data.responseObject.map((item) => (item.key = item.id));
  response.data.responseObject.map((item) => {
    responseCategories.data.responseObject.map((category) => {
      if (category.id === item.categoryid) {
        item.category = category.name;
      }
    });
  });

  return response.data.responseObject;
});

export const getProductById = createAsyncThunk('/api/product/id', async ({ id }, thunkApi) => {
  const response = await axios({
    method: 'get',
    url: getProductByIdUrl + id,
  });

  return response.data.responseObject;
});

export const getProductByName = createAsyncThunk('/api/product/searchbyname', async ({ name }, thunkApi) => {
  const response = await axios({
    method: 'post',
    url: getProductByNameUrl,
    data: {
      name,
    },
  });

  return response.data.responseObject;
});

export const filterProductByDomain = createAsyncThunk('/api/product/filterbydomainid', async ({ id }, thunkApi) => {
  const response = await axios({
    method: 'post',
    url: filterProductByDomainUrl,
    data: {
      id,
    },
  });

  return response.data.responseObject;
});

export const filterProductByService = createAsyncThunk('/api/product/filterbyserviceid', async ({ id }, thunkApi) => {
  const response = await axios({
    method: 'post',
    url: filterProductByServiceUrl,
    data: {
      id,
    },
  });

  return response.data.responseObject;
});

export const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.productDetail = action.payload;
    });
    builder.addCase(getProductByName.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(filterProductByDomain.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(filterProductByService.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export default productSlice.reducer;
