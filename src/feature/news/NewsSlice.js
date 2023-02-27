import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const newsUrl = 'http://localhost:8080/api/v1/all-news';
const getNewsByIdUrl = 'http://localhost:8080/api/v1/news';

const initialState = {
  news: null,
  newsDetail: null,
};

export const getAllNews = createAsyncThunk('/api/all-news', async (thunkApi) => {
  const response = await axios({
    method: 'get',
    url: newsUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  return response.data.responseObject;
});

export const getNewsById = createAsyncThunk('/api/news', async ({ id }, thunkApi) => {
  const response = await axios({
    method: 'post',
    url: getNewsByIdUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: {
      id,
    },
  });
  return response.data.responseObject;
});

export const newsSlice = createSlice({
  name: 'newsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllNews.fulfilled, (state, action) => {
      state.news = action.payload;
    });
    builder.addCase(getNewsById.fulfilled, (state, action) => {
      state.newsDetail = action.payload;
    });
  },
});

export default newsSlice.reducer;
