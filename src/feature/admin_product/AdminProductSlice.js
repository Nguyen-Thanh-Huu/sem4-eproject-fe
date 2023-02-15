import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const getAllProductsUrl = 'http://localhost:8080/api/v1/products';
const createNewProductUrl = 'http://localhost:8080/api/v1/insert-product';
const updateProductUrl = 'http://localhost:8080/api/v1/update-product';
const deleteProductUrl = 'http://localhost:8080/api/v1/delete-product';

const getAllCategoriesUrl = 'http://localhost:8080/api/v1/categories';

const initialState = {
  products: null,
  createProductStatus: null,
  updateProductStatus: null,
  deleteProductStatus: null,
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

export const createNewProduct = createAsyncThunk(
  '/api/v1/insert-product',
  async ({ name, price, image, description, categoryid, alcohol }, thunkApi) => {
    const response = await axios({
      method: 'post',
      url: createNewProductUrl,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        id: '',
        name,
        price,
        image,
        description,
        categoryid,
        alcohol,
        deleted: false,
      },
    });

    return response.data.status;
  }
);

export const updateProduct = createAsyncThunk(
  '/api/v1/update-product',
  async ({ id, name, price, image, description, categoryid, alcohol }, thunkApi) => {
    const response = await axios({
      method: 'put',
      url: updateProductUrl,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        id,
        name,
        price,
        image,
        description,
        categoryid,
        alcohol,
        deleted: false,
      },
    });

    return response.data.status;
  }
);

export const deleteProduct = createAsyncThunk(
  '/api/v1/delete-product',
  async ({ id, name, price, image, description, categoryid, alcohol }, thunkApi) => {
    const response = await axios({
      method: 'delete',
      url: deleteProductUrl,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        id,
        name,
        price,
        image,
        description,
        categoryid,
        alcohol,
        deleted: true,
      },
    });

    return response.data.status;
  }
);

export const adminProductSlice = createSlice({
  name: 'adminProductSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.products = action.payload;
    });
    builder.addCase(createNewProduct.fulfilled, (state, action) => {
      state.createProductStatus = action.payload;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      state.updateProductStatus = action.payload;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      state.deleteProductStatus = action.payload;
    });
  },
});

export default adminProductSlice.reducer;
