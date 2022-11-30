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
    const trackedDataQuery = query(trackedDataRef, where("id", "==", id));
    const trackedDataSnapshot = await getDocs(trackedDataQuery);

    const trackedData: Item[] = trackedDataSnapshot.docs.map((document: any) =>
      Object.assign({}, document.data())
    );

    return trackedData;
  }
);

export const addTrackedDataItem = createAsyncThunk(
  "trackedData/addItem",
  async ({ id, title, time }: Item) => {
    const trackedDataRef = collection(dataBase, "trackedData");
    const item: Item = { id, title, time };

    addDoc(trackedDataRef, item);

    return item;
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
      state.data = action.payload.slice();
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
