import { configureStore } from "@reduxjs/toolkit";
import countrySlice  from "../features/country/CountrySlice";

export const store = configureStore({
  reducer: {
    country: countrySlice,
  },
});
