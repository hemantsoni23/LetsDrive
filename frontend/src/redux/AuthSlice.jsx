import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

// Async thunk for fetching user details
export const fetchUserDetails = createAsyncThunk(
  'auth/fetchUserDetails',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_ROUTE}/users/profile`, {
        refreshToken:Cookies.get('refreshToken'),
        headers: {
          Authorization: `Bearer ${Cookies.get('accessToken')}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      return thunkAPI.rejectWithValue(error.response?.data || 'Failed to fetch user details');
    }
  }
);

export const refreshToken = createAsyncThunk('auth/refreshToken', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_ROUTE}/users/refresh-token`, { withCredentials: true });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || 'Failed to refresh token');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authToken: false,
    userEmail: null,
    userDetails: null,
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
      state.userDetails = null; 
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.userDetails = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
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
