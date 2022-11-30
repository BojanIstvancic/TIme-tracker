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

interface User {
  id: string;
  name: string;
  surname: string;
}
interface AuthenticationState {
  user: User;
  isLoading: boolean;
}

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
    const userDataQuery = query(usersDataRef, where("id", "==", id));
    const userDataSnapshot = await getDocs(userDataQuery);

    const userData = userDataSnapshot.docs[0].data();
    return userData;
  }
);

export const updateUserInDatabase = createAsyncThunk(
  "user/updateUserInDatabase",
  async ({ id, name, surname }: User) => {
    const userRef = doc(dataBase, "users", id);
    const userData: User = { id: id, name: name, surname: surname };

    await setDoc(userRef, userData);

    return userData;
  }
);

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
      state.user = Object.assign({}, state.user, { id: action.payload.id });
      state.isLoading = false;
    });
    builder.addCase(createUserInDatabase.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(getUserFromDatabase.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserFromDatabase.fulfilled, (state, action) => {
      state.user = Object.assign({}, state.user, {
        name: action.payload.name,
        surname: action.payload.surname,
      });
      state.isLoading = false;
    });
    builder.addCase(getUserFromDatabase.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(updateUserInDatabase.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateUserInDatabase.fulfilled, (state, action) => {
      state.user = Object.assign({}, state.user, {
        name: action.payload.name,
        surname: action.payload.surname,
      });
      state.isLoading = false;
    });
    builder.addCase(updateUserInDatabase.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default userSlice.reducer;
