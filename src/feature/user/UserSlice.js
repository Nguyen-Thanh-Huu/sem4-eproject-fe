import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const signInUrl = 'http://localhost:8080/api/v1/authenticate';
const getUserByIdUrl = 'http://localhost:8080/api/v1/user';

const initialState = {
  user: null,
  userAccount: null,
};

export const signIn = createAsyncThunk('/api/user/authenticate', async ({ email, password }, thunkApi) => {
  const response = await axios({
    method: 'post',
    url: signInUrl,
    data: {
      login: email,
      password,
    },
  });

  if (response.data && response.data.status !== 'fail') {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('userid', response.data.id);
    localStorage.setItem('userrole', response.data.role);
    localStorage.setItem('userFirstname', response.data.firstname);
    localStorage.setItem('userLastname', response.data.lastname);
    localStorage.setItem('userAddress', response.data.address);
    localStorage.setItem('userDistrict', response.data.district);
    localStorage.setItem('userCity', response.data.city);
    response.data.status = 'ok';
  }

  return response.data;
});

export const getUserById = createAsyncThunk('/api/user/id', async ({ id }, thunkApi) => {
  const response = await axios({
    method: 'post',
    url: getUserByIdUrl,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: {
      id,
    },
  });

  return response.data.responseObject;
});

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    resetUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.user = action.payload;
    });
    builder.addCase(getUserById.fulfilled, (state, action) => {
      state.userAccount = action.payload;
    });
  },
});

export const { resetUser } = userSlice.actions;

export default userSlice.reducer;
