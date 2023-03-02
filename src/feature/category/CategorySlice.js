import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const getAllCategoriesUrl = 'http://localhost:8080/api/v1/categories';
const getCategoryByIdUrl = 'http://localhost:8080/api/v1/category';

const initialState = {
  categories: null,
  category: null,
};

export const getAllCategories = createAsyncThunk('/api/v1/categories', async (thunkApi) => {
  const response = await axios({
    method: 'get',
    url: getAllCategoriesUrl,
  });

  return response.data.responseObject;
});

export const getCategoryById = createAsyncThunk('/api/category', async ({ id }, thunkApi) => {
  const response = await axios({
    method: 'post',
    url: getCategoryByIdUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: {
      id,
    },
  });

  return response.data.responseObject;
});

export const categorySlice = createSlice({
  name: 'categorySlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(getCategoryById.fulfilled, (state, action) => {
      state.category = action.payload;
    });
  },
});

export default categorySlice.reducer;
