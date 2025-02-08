import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/axios";

export const getCountryList = createAsyncThunk(
  "country/list",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get("/all", { params: payload });
      console.log(response);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
