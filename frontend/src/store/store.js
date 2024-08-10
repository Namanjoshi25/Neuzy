// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authSlice from './authSlice';
import authorAuthSlice from './authorAuthSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
};

const authorAuthPersistConfig = {
  key: 'authorAuth',
  storage,
};

const persistedReducer = persistReducer(authPersistConfig, authSlice);
const authorPersistedReducer = persistReducer(authorAuthPersistConfig,authorAuthSlice)

const store = configureStore({
  reducer: {
    auth: persistedReducer,
    author : authorPersistedReducer
    // other slices
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
