import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { dataBase } from "../config/firebase/firebase";

export const createUserInDatabase = createAsyncThunk(
  "user/createUserInDatabase",
  async ({ userId }: { userId: string }) => {
    const usersDataRef = collection(dataBase, "users");

    await addDoc(usersDataRef, { name: "", surname: "", userId });

    return { userId };
  }
);

export const getUserFromDatabase = createAsyncThunk(
  "user/getUserFromDatabase",
  async ({ userId }: { userId: string }) => {
    const usersDataRef = collection(dataBase, "users");

    const userData = await getDocs(usersDataRef);

    return userData.docs
      .map((doc: any) => ({
        ...doc.data(),
      }))
      .find((doc: any) => userId === doc.userId);
  }
);

export interface User {
  name: string;
  surname: string;
  userId: string;
}
export interface AuthenticationState {
  user: User;
  isLoading: boolean;
}

const initialState: AuthenticationState = {
  user: {
    name: "",
    surname: "",
    userId: "",
  },
  isLoading: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createUserInDatabase.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createUserInDatabase.fulfilled, (state, action) => {
      state.user = {
        userId: action.payload.userId,
        name: "",
        surname: "",
      };
      state.isLoading = false;
    });
    builder.addCase(createUserInDatabase.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getUserFromDatabase.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserFromDatabase.fulfilled, (state, action) => {
      state.user = {
        userId: action.payload.userId,
        name: action.payload.name,
        surname: action.payload.surname,
      };
      state.isLoading = false;
    });
    builder.addCase(getUserFromDatabase.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default userSlice.reducer;
