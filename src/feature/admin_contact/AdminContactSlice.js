import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const getAllContactsUrl = 'http://localhost:8080/api/v1/contacts';
const createNewContactUrl = 'http://localhost:8080/api/v1/insert-contact';
const updateContactUrl = 'http://localhost:8080/api/v1/update-contact';
const deleteContactUrl = 'http://localhost:8080/api/v1/delete-contact';

const initialState = {
  contacts: null,
  createContactStatus: null,
  updateContactStatus: null,
  deleteContactStatus: null,
};

export const getAllContacts = createAsyncThunk('/api/Contact', async (thunkApi) => {
  const response = await axios({
    method: 'get',
    url: getAllContactsUrl,
  });

  response.data.responseObject.map((item) => (item.key = item.id));

  return response.data.responseObject;
});

export const createNewContact = createAsyncThunk(
  '/api/Contact/CreateContact',
  async ({ address, district, city, phone, email }, thunkApi) => {
    const response = await axios({
      method: 'post',
      url: createNewContactUrl,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        id: '',
        address,
        district,
        city,
        phone,
        email,
        deleted: false,
      },
    });

    return response.data.status;
  }
);

export const updateContact = createAsyncThunk(
  '/api/Contact/UpdateContact',
  async ({ id, address, district, city, phone, email }, thunkApi) => {
    const response = await axios({
      method: 'put',
      url: updateContactUrl,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        id,
        address,
        district,
        city,
        phone,
        email,
        deleted: false,
      },
    });

    return response.data.status;
  }
);

export const deleteContact = createAsyncThunk(
  '/api/Contact/DeleteContact',
  async ({ id, address, district, city, phone, email }, thunkApi) => {
    const response = await axios({
      method: 'delete',
      url: deleteContactUrl,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      data: {
        id,
        address,
        district,
        city,
        phone,
        email,
        deleted: true,
      },
    });

    return response.data.status;
  }
);

export const adminContactSlice = createSlice({
  name: 'adminContactSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllContacts.fulfilled, (state, action) => {
      state.contacts = action.payload;
    });
    builder.addCase(createNewContact.fulfilled, (state, action) => {
      state.createContactStatus = action.payload;
    });
    builder.addCase(updateContact.fulfilled, (state, action) => {
      state.updateContactStatus = action.payload;
    });
    builder.addCase(deleteContact.fulfilled, (state, action) => {
      state.deleteContactStatus = action.payload;
    });
  },
});

export default adminContactSlice.reducer;
