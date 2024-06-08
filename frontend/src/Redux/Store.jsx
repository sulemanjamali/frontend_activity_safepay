import { configureStore } from "@reduxjs/toolkit";
import StudentReducer from "./slices/StudentsSlice";
import UserReducer from "./slices/UserSlice"; 
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
const persistConfig = {
    key: 'root',
    storage,
  }
  const persistedReducer = persistReducer(persistConfig, UserReducer)
export const store = configureStore({
    reducer:{
        student:StudentReducer,
        user:persistedReducer
    },
});

export const persistor = persistStore(store)