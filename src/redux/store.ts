import { configureStore, combineReducers, createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit'
import authenticationReducer, {  signIn, signUp } from './authenticationSlice';
import trackedDataReducer from './trackedDataSlice';
import userReducer, { createUserInDatabase, getUserFromDatabase } from './userSlice';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key:"root",
  version: 1,
  storage
}

const reducer = combineReducers({
    authentication: authenticationReducer,
    user: userReducer,
    trackedData: trackedDataReducer,
})

const persistedReducer = persistReducer(persistConfig, reducer);

// side effects
const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  matcher: isAnyOf(signUp.fulfilled),
  effect: (action, listenerApi) => {

   listenerApi.dispatch(createUserInDatabase({ userId: action.payload.uid}))
  },
})

listenerMiddleware.startListening({
  matcher: isAnyOf(signIn.fulfilled),
  effect: (action, listenerApi) => {

   listenerApi.dispatch(getUserFromDatabase({ userId: action.payload.uid}))
  },
})

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).prepend(listenerMiddleware.middleware),
})

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>