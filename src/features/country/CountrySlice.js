import { createSlice } from "@reduxjs/toolkit";
import { getCountryList } from "./CountryAction";

const initialState = {
  country: [],
  status: false,
  error: null,
};

export const countrySlice = createSlice({
  name: "country",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCountryList.pending, (state) => {
      state.status = true;
      state.error = null;
    });
    builder.addCase(getCountryList.fulfilled, (state, action) => {
      state.status = false;
      state.country = action.payload;
    });
    builder.addCase(getCountryList.rejected, (state, action) => {
      state.status = false;
      state.error = action.payload;
    });
  },
});

export default countrySlice.reducer;
