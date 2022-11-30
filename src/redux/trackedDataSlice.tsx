import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { dataBase } from "../config/firebase/firebase";

interface Item {
  id: string;
  time: number;
  title: string;
}

interface TrackedData {
  data: Item[] | null;
  isLoading: boolean;
}

export const getTrackerData = createAsyncThunk(
  "trackedData/getData",
  async ({ id }: { id: string }) => {
    const trackedDataRef = collection(dataBase, "trackedData");
    const trackedData = await getDocs(
      query(trackedDataRef, where("id", "==", id))
    );

    return trackedData.docs.map((document: any) => ({
      ...document.data(),
    }));
  }
);

export const addTrackedDataItem = createAsyncThunk(
  "trackedData/addItem",
  async ({ id, title, time }: Item) => {
    const trackedDataRef = collection(dataBase, "trackedData");
    addDoc(trackedDataRef, { id, title, time });

    return { id, title, time };
  }
);

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
