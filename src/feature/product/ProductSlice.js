import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const getAllProductsUrl = 'http://localhost:8080/api/v1/products';
const getProductByIdUrl = 'http://localhost:8080/api/v1/product';
const getAllCategoriesUrl = 'http://localhost:8080/api/v1/categories';
const getAllByAlcoholUrl = 'http://localhost:8080/api/v1/alcohol?alcoholNumber=';
const getProductByCategoryIdUrl = 'http://localhost:8080/api/v1/product-by-cateId';

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

export const getProductById = createAsyncThunk('/api/product', async ({ id }, thunkApi) => {
  const response = await axios({
    method: 'post',
    url: getProductByIdUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: {
      id,
    },
  });

  return response.data.responseObject;
});

export const getAllByLeverAlcohol = createAsyncThunk('/api/alcohol', async ({ alcoholLevel }, thunkApi) => {
  const response = await axios({
    method: 'get',
    url: getAllByAlcoholUrl + alcoholLevel,
  });

  return response.data.responseObject;
});

export const getAllProductsByCategoryId = createAsyncThunk(
  '/api/product-by-cateId',
  async ({ categoryId }, thunkApi) => {
    const response = await axios({
      method: 'post',
      url: getProductByCategoryIdUrl,
      data: {
        id: categoryId,
      },
    });
    return response.data.responseObject;
  }
);

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
    builder.addCase(getAllByLeverAlcohol.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(getAllProductsByCategoryId.fulfilled, (state, action) => {
      state.products = action.payload;
    });
  },
});

export default productSlice.reducer;
