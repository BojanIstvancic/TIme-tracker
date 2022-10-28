import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { dataBase } from "../config/firebase/firebase";

export const getTrackerData = createAsyncThunk(
  "trackedData/getData",
  async ({ id }: { id: string }) => {
    const trackedDataRef = collection(dataBase, "trackedData");

    const trackedData = await getDocs(trackedDataRef);

    return trackedData.docs
      .map((doc: any) => ({
        ...doc.data(),
      }))
      .filter((doc: any) => id === doc.id);
  }
);

export const addTrackedDataItem = createAsyncThunk(
  "trackedData/addItem",
  async ({ title, id, time }: { title: string; id: string; time: number }) => {
    const trackedDataRef = collection(dataBase, "trackedData");

    await addDoc(trackedDataRef, { title, id, time });

    return { time, title, id };
  }
);

export interface Data {
  id: string;
  time: number;
  title: string;
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

    builder.addCase(addTrackedDataItem.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addTrackedDataItem.fulfilled, (state, action) => {
      state.data?.push(action.payload);
      state.isLoading = false;
    });
    builder.addCase(addTrackedDataItem.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default trackedDataSlice.reducer;
