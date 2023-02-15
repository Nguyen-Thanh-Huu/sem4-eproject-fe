import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const getAllCategoriesUrl = 'http://localhost:8080/api/v1/categories';

const initialState = {
  categories: null,
};

export const getAllCategories = createAsyncThunk('/api/v1/categories', async (thunkApi) => {
  const response = await axios({
    method: 'get',
    url: getAllCategoriesUrl,
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
  },
});

export default categorySlice.reducer;
