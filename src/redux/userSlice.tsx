import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  query,
  where,
  setDoc,
  doc,
} from "firebase/firestore";
import { dataBase } from "../config/firebase/firebase";

export const createUserInDatabase = createAsyncThunk(
  "user/createUserInDatabase",
  async ({ id }: { id: string }) => {
    await setDoc(doc(dataBase, "users", id), {
      id: id,
      name: "",
      surname: "",
    });

    return { id };
  }
);

export const getUserFromDatabase = createAsyncThunk(
  "user/getUserFromDatabase",
  async ({ id }: { id: string }) => {
    const usersDataRef = collection(dataBase, "users");
    const userQuery = await getDocs(query(usersDataRef, where("id", "==", id)));

    return userQuery.docs[0].data();
  }
);

export const updateProfileInDatabase = createAsyncThunk(
  "user/updateProfileIndatabase",
  async ({
    id,
    name,
    surname,
  }: {
    id: string;
    name: string;
    surname: string;
  }) => {
    const userRef = doc(dataBase, "users", id);

    await setDoc(userRef, { id: id, name: name, surname: surname });

    return { name, surname };
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
        ...state.user,
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
