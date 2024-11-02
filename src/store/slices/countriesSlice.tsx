"use client";
import Fetch from "@/configs/api/fetch";
import { AppContants } from "@/lib/constants";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";

import { ICountry } from "../../lib/models/country.model";

interface DataState {
  countryItems: any[];
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  countryItems: [],
  loading: false,
  error: null,
};

// Async thunk to fetch data
export const fetchCountriesData = createAsyncThunk("data/fetchCountreisData", async (_, { rejectWithValue }) => {
  try {
    const response = await Fetch({
      url: "/v1/country?page=2",
      method: "GET",
      token: getCookie(AppContants.ParseSessionCookieName),
      cache: "force-cache",
      next: { revalidate: 1 },
    });

    console.log("mm 300303 -- -- -- country   , data ---   ", response);
    return response;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCountriesData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCountriesData.fulfilled, (state, action) => {
        console.log("mm 303- - --  COUNTRIES ", action.payload.items);
        state.loading = false;
        state.countryItems = action.payload.items;
      })
      .addCase(fetchCountriesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

//export const { increment, decrement, incrementByAmount } = exampleSlice.actions;
export default countriesSlice.reducer;