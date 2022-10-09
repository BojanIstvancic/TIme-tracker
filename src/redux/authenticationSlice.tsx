import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
import {
  createUser,
  firebaseAppAuth,
  signInUser,
} from "../config/firebase/firebase";

export const signUp = createAsyncThunk(
  "authentication/signUp",
  async ({ email, password }: { email: string; password: string }) => {
    const user = await createUser(firebaseAppAuth, email, password);
    return user.user;
  }
);

export const signIn = createAsyncThunk(
  "authentication/signIn",
  async ({ email, password }: { email: string; password: string }) => {
    const user = await signInUser(firebaseAppAuth, email, password);
    return user.user;
  }
);

// const signOut = async () => {
//   await signOutUser(firebaseAppAuth);
// };

export interface AuthenticationState {
  user: null | object;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthenticationState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

export const authenticationSlice = createSlice({
  name: "authentication",
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
    builder.addCase(signUp.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.user = {
        id: action.payload.uid,
        email: action.payload.email,
      };
      state.isAuthenticated = true;
      state.isLoading = false;
    });
    builder.addCase(signUp.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      console.log(action.payload);
      state.user = {
        id: action.payload.uid,
        email: action.payload.email,
      };
      state.isAuthenticated = true;
      state.isLoading = false;
    });
    builder.addCase(signIn.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

// export const { increment } = authenticationSlice.actions;

export default authenticationSlice.reducer;
