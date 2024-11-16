import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

export const refreshToken = createAsyncThunk('auth/refreshToken', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_ROUTE}/users/refresh-token`, { withCredentials: true });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authToken: false,
    userEmail: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    login: (state, action) => {
      state.authToken = true;
      state.userEmail = action.payload;
    },
    logout: (state) => {
      Cookies.remove('accessToken');
      Cookies.remove('refreshToken');
      Cookies.remove('email');
      Cookies.remove('role');
      state.authToken = false;
      state.userEmail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.authToken = true;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.authToken = false;
        state.error = action.payload;
      });
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
