import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const getAllNewsUrl = 'http://localhost:8080/api/v1/all-news';
const createNewNewsUrl = 'http://localhost:8080/api/v1/insert-news';
const updateNewsUrl = 'http://localhost:8080/api/v1/update-news';
const deleteNewsUrl = 'http://localhost:8080/api/v1/delete-news';

const initialState = {
  news: null,
  createNewsStatus: null,
  updateNewsStatus: null,
  deleteNewsStatus: null,
};

export const getAllNews = createAsyncThunk('/api/News', async (thunkApi) => {
  const response = await axios({
    method: 'get',
    url: getAllNewsUrl,
  });

  response.data.responseObject.map((item) => (item.key = item.id));

  return response.data.responseObject;
});

export const createNewNews = createAsyncThunk('/api/News/CreateNews', async ({ image, content, title }, thunkApi) => {
  const response = await axios({
    method: 'post',
    url: createNewNewsUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: {
      id: '',
      image,
      content,
      title,
      deleted: false,
    },
  });

  return response.data.status;
});

export const updateNews = createAsyncThunk('/api/News/UpdateNews', async ({ id, image, content, title }, thunkApi) => {
  const response = await axios({
    method: 'put',
    url: updateNewsUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: {
      id,
      image,
      content,
      title,
      deleted: false,
    },
  });

  return response.data.status;
});

export const deleteNews = createAsyncThunk('/api/News/DeleteNews', async ({ id, image, content, title }, thunkApi) => {
  const response = await axios({
    method: 'delete',
    url: deleteNewsUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: {
      id,
      image,
      content,
      title,
      deleted: true,
    },
  });

  return response.data.status;
});

export const adminNewsSlice = createSlice({
  name: 'adminNewsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllNews.fulfilled, (state, action) => {
      state.news = action.payload;
    });
    builder.addCase(createNewNews.fulfilled, (state, action) => {
      state.createNewsStatus = action.payload;
    });
    builder.addCase(updateNews.fulfilled, (state, action) => {
      state.updateNewsStatus = action.payload;
    });
    builder.addCase(deleteNews.fulfilled, (state, action) => {
      state.deleteNewsStatus = action.payload;
    });
  },
});

export default adminNewsSlice.reducer;
