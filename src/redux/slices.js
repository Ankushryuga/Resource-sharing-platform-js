import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import configurations from "../config/config";
const baseURL = configurations.baseURL;

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(`${baseURL}users/getAllUser`);
  return response.data;
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    userslist: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.userslist = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
