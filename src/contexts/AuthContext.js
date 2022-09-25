import React, { useEffect, useState } from "react";
import { createUser, firebaseAppAuth } from "../config/firebase/firebase";

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

  useEffect(() => {
    const unsubscribe = firebaseAppAuth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      // set user
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser, // currentUser
    signUp, // signUp with unsubsribe
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
