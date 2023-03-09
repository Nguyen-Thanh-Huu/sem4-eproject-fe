import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const getAllCateAlcoholsUrl = 'http://localhost:8080/api/v1/cate-alcohol';

const initialState = {
  cateAlcohol: null,
};

export const getAllCateAlcohol = createAsyncThunk('/api/cate-alcohol', async (thunkApi) => {
  const response = await axios({
    method: 'get',
    url: getAllCateAlcoholsUrl,
  });

  return response.data.responseObject;
});

export const alcoholSlice = createSlice({
  name: 'domainSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllCateAlcohol.fulfilled, (state, action) => {
      state.cateAlcohol = action.payload;
    });
  },
});

export default alcoholSlice.reducer;
