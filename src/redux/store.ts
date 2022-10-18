import { configureStore, combineReducers } from '@reduxjs/toolkit'
import authenticationReducer from './authenticationSlice';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key:"root",
  version: 1,
  storage
}

const reducer = combineReducers({
    authentication: authenticationReducer 
})

const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>