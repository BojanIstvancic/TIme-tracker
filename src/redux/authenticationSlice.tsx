import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";
import {
  createUser,
  firebaseAppAuth,
  signInUser,
  signOutUser,
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

export const signOut = createAsyncThunk("authentication/signOut", async () => {
  await signOutUser(firebaseAppAuth);
});

export interface User {
  id: string | null;
  email: string | null;
}
export interface AuthenticationState {
  user: User;
  isLogedIn: boolean;
  isLoading: boolean;
}

const initialState: AuthenticationState = {
  user: {
    id: null,
    email: null,
  },
  isLogedIn: false,
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
      state.isLogedIn = true;
      state.isLoading = false;
    });
    builder.addCase(signUp.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(signIn.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.user = {
        id: action.payload.uid,
        email: action.payload.email,
      };
      state.isLogedIn = true;
      state.isLoading = false;
    });
    builder.addCase(signIn.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(signOut.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(signOut.fulfilled, (state) => {
      state.isLogedIn = false;
      state.isLoading = false;
    });
    builder.addCase(signOut.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

// export const { increment } = authenticationSlice.actions;

export default authenticationSlice.reducer;
