"use client";
import Fetch from "@/configs/api/fetch";
import { AppContants } from "@/lib/constants";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";

interface DataState {
  industryItems: any[];
  loading: boolean;
  error: string | null;
}

const initialState: DataState = {
  industryItems: [],
  loading: false,
  error: null,
};

// Async thunk to fetch data
export const fetchIndustriesData = createAsyncThunk("data/fetchIndustriesData", async (_, { rejectWithValue }) => {
  try {
    const response = await Fetch({
      url: "/v1/industry?page=0",
      method: "GET",
      token: getCookie(AppContants.ParseSessionCookieName),
      cache: "force-cache",
      next: { revalidate: 3600 },
    });

    // if (!response.ok) throw new Error("Failed to fetch data");

    return response;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

const industriesSlice = createSlice({
  name: "industries",
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
      .addCase(fetchIndustriesData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIndustriesData.fulfilled, (state, action) => {
        state.loading = false;
        state.industryItems = action.payload;
      })
      .addCase(fetchIndustriesData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

//export const { increment, decrement, incrementByAmount } = exampleSlice.actions;
export default industriesSlice.reducer;
