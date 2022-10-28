import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { dataBase } from "../config/firebase/firebase";

export const createUserInDatabase = createAsyncThunk(
  "user/createUserInDatabase",
  async ({ id }: { id: string }) => {
    const usersDataRef = collection(dataBase, "users");

    await addDoc(usersDataRef, { name: "", surname: "", id });

    return { id };
  }
);

export const getUserFromDatabase = createAsyncThunk(
  "user/getUserFromDatabase",
  async ({ id }: { id: string }) => {
    const usersDataRef = collection(dataBase, "users");

    const userData = await getDocs(usersDataRef);

    return userData.docs
      .map((doc: any) => ({
        ...doc.data(),
      }))
      .find((doc: any) => id === doc.id);
  }
);

export interface User {
  id: string;
  name: string;
  surname: string;
}
export interface AuthenticationState {
  user: User;
  isLoading: boolean;
}

const initialState: AuthenticationState = {
  user: {
    id: "",
    name: "",
    surname: "",
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
      state.user = { ...state.user, id: action.payload.id };
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
        id: action.payload.id,
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
