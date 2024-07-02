import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAsyncData = createAsyncThunk(
  "data/getAsyncData",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/photos"
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const initialState = { loading: false, data: [], error: "" };
const datSalice = createSlice({
  name: "data",
  initialState,
  extraReducers: (data) => {
    data.addCase(getAsyncData.pending, (state, action) => {
      state.loading = true;
    });
    data.addCase(getAsyncData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    data.addCase(getAsyncData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default datSalice.reducer;
