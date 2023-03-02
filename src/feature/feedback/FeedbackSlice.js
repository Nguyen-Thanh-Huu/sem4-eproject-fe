import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const createNewFeedbackUrl = 'http://localhost:8080/api/v1/insert-feedback';
const getAllByProductIdUrl = 'http://localhost:8080/api/v1/feedbacks/by-product-id';

const initialState = {
  feedbacks: null,
  createFeedbackStatus: null,
};

export const createNewFeedback = createAsyncThunk(
  'api/v1/insert-feedback',
  async ({ userId, content, createat, productId, firstName, lastName }, thunkApi) => {
    const response = await axios({
      method: 'post',
      url: createNewFeedbackUrl,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        id: '',
        userId,
        content,
        createat,
        productId,
        firstName,
        lastName,
        deleted: false,
      },
    });

    return response.data.responseObject;
  }
);

export const getAllByProductId = createAsyncThunk('api/v1/feedback/getallbyproductid', async ({ id }, thunkApi) => {
  const response = await axios({
    method: 'post',
    url: getAllByProductIdUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: {
      id,
    },
  });

  return response.data.responseObject;
});

export const feedbackSlice = createSlice({
  name: 'domainSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createNewFeedback.fulfilled, (state, action) => {
      state.createFeedbackStatus = action.payload;
    });
    builder.addCase(getAllByProductId.fulfilled, (state, action) => {
      state.feedbacks = action.payload;
    });
  },
});

export default feedbackSlice.reducer;
