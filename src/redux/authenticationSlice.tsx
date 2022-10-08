import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AuthenticationState {
  value: number;
}

const initialState: AuthenticationState = {
  value: 1,
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } =
  authenticationSlice.actions;

export default authenticationSlice.reducer;
