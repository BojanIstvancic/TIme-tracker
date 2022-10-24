import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { dataBase } from "../config/firebase/firebase";
// import type { PayloadAction } from "@reduxjs/toolkit";

export const getTrackerData = createAsyncThunk(
  "tracketData/getData",
  async ({ userId }: { userId: string }) => {
    const trackedDataRef = collection(dataBase, "trackedData");

    const trackedData = await getDocs(trackedDataRef);

    const data = trackedData.docs
      .map((doc: any) => ({
        ...doc.data(),
      }))
      .filter((doc: any) => userId === doc.userId);
    return data;
  }
);

export interface Data {
  time: number;
  title: string;
  userId: string;
}

export interface TrackedData {
  data: Data[] | null;
  isLoading: boolean;
}

const initialState: TrackedData = {
  data: null,
  isLoading: false,
};

export const trackedDataSlice = createSlice({
  name: "trackedData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTrackerData.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getTrackerData.fulfilled, (state, action) => {
      state.data = [...action.payload];
      state.isLoading = false;
    });
    builder.addCase(getTrackerData.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default trackedDataSlice.reducer;
