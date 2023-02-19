import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const getAllUsersUrl = 'http://localhost:8080/api/v1/users';
const createNewUserUrl = 'http://localhost:8080/api/v1/insert-user';
const updateUserWithoutPasswordUrl = 'http://localhost:44302/api/user/updateuserwithoutpassword';
const updateUserUrl = 'http://localhost:8080/api/v1/update-user';
const deleteUserUrl = 'http://localhost:8080/api/v1/delete-user';

const initialState = {
  users: null,
  createUserStatus: null,
  updateUserStatus: null,
  updateUserWithoutPasswordStatus: null,
  deleteUserStatus: null,
};

export const getAllUsers = createAsyncThunk('/api/user', async (thunkApi) => {
  const response = await axios({
    method: 'get',
    url: getAllUsersUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  response.data.responseObject.map((item) => (item.key = item.id));

  return response.data.responseObject;
});

export const createNewUser = createAsyncThunk(
  '/api/user/createuser',
  async ({ firstname, lastname, address, district, city, role, phone, email, password }, thunkApi) => {
    const response = await axios({
      method: 'post',
      url: createNewUserUrl,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        id: '',
        firstname,
        lastname,
        address,
        district,
        city,
        role,
        phone,
        email,
        password,
        deleted: false,
      },
    });

    return response.data.status;
  }
);

export const updateUserWithoutPassword = createAsyncThunk(
  '/api/user/updateuserwithoutpassword',
  async ({ id, firstname, lastname, address, district, city, role, phone, email }, thunkApi) => {
    const response = await axios({
      method: 'put',
      url: updateUserWithoutPasswordUrl,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        id,
        firstname,
        lastname,
        address,
        district,
        city,
        role,
        phone,
        email,
        password: '',
        deleted: false,
      },
    });

    return response.data.status;
  }
);

export const updateUser = createAsyncThunk(
  '/api/user/updateuser',
  async ({ id, firstname, lastname, address, district, city, role, phone, email }, thunkApi) => {
    const response = await axios({
      method: 'put',
      url: updateUserUrl,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        id,
        firstname,
        lastname,
        address,
        district,
        city,
        role,
        phone,
        email,
        deleted: false,
      },
    });

    return response.data.status;
  }
);

export const deleteUser = createAsyncThunk(
  '/api/user/deleteuser',
  async ({ id, firstname, lastname, address, district, city, role, phone, email, password }, thunkApi) => {
    const response = await axios({
      method: 'delete',
      url: deleteUserUrl,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        id,
        firstname,
        lastname,
        address,
        district,
        city,
        role,
        phone,
        email,
        password,
        deleted: true,
      },
    });

    return response.data.status;
  }
);

export const adminUserSlice = createSlice({
  name: 'adminUserSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(createNewUser.fulfilled, (state, action) => {
      state.createUserStatus = action.payload;
    });
    builder.addCase(updateUserWithoutPassword.fulfilled, (state, action) => {
      state.updateUserWithoutPasswordStatus = action.payload;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.updateUserStatus = action.payload;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      state.deleteUserStatus = action.payload;
    });
  },
});

export default adminUserSlice.reducer;
