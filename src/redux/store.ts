import { configureStore } from '@reduxjs/toolkit'
import authenticationReducer from './authenticationSlice';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>