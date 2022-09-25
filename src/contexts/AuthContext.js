import React, { useEffect, useState } from "react";
import {
  createUser,
  firebaseAppAuth,
  signInUser,
  signOutUser,
} from "../config/firebase/firebase";

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const signUp = async (email, password) => {
    try {
      const user = await createUser(firebaseAppAuth, email, password);
      setCurrentUser(user.user);
    } catch (error) {
      console.log(error);
    }
  };

  const signIn = async (email, password) => {
    try {
      const user = await signInUser(firebaseAppAuth, email, password);
      setCurrentUser(user.user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const signOut = async () => {
    await signOutUser(firebaseAppAuth);
  };

  const value = {
    currentUser, // currentUser
    signUp,
    signIn,
    signOut,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
