import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const getAllCategoriesUrl = 'http://localhost:8080/api/v1/categories';
const createNewCategoryUrl = 'http://localhost:8080/api/v1/insert-category';
const updateCategoryUrl = 'http://localhost:8080/api/v1/update-category';
const deleteCategoryUrl = 'http://localhost:8080/api/v1/delete-category';

const initialState = {
  categories: null,
  createCategoryStatus: null,
  updateCategoryStatus: null,
  deleteCategoryStatus: null,
};

export const getAllCategories = createAsyncThunk('/api/v1/categories', async (thunkApi) => {
  const response = await axios({
    method: 'get',
    url: getAllCategoriesUrl,
  });

  response.data.responseObject.map((item) => (item.key = item.id));

  return response.data.responseObject;
});

export const createNewCategory = createAsyncThunk('/api/v1/insert-category', async ({ name }, thunkApi) => {
  const response = await axios({
    method: 'post',
    url: createNewCategoryUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: {
      id: '',
      name,
      deleted: false,
    },
  });

  return response.data.status;
});

export const updateCategory = createAsyncThunk('/api/v1/update-category', async ({ id, name }, thunkApi) => {
  const response = await axios({
    method: 'put',
    url: updateCategoryUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: {
      id,
      name,
      deleted: false,
    },
  });

  return response.data.status;
});

export const deleteCategory = createAsyncThunk('/api/v1/delete-category', async ({ id, name }, thunkApi) => {
  const response = await axios({
    method: 'delete',
    url: deleteCategoryUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: {
      id,
      name,
      deleted: true,
    },
  });

  return response.data.status;
});

export const adminCategorySlice = createSlice({
  name: 'adminCategorySlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
    builder.addCase(createNewCategory.fulfilled, (state, action) => {
      state.createCategoryStatus = action.payload;
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.updateCategoryStatus = action.payload;
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.deleteCategoryStatus = action.payload;
    });
  },
});

export default adminCategorySlice.reducer;
