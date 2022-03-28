import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import testReducer from './example/reducer';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, testReducer);

const store = configureStore({
  reducer: {
    testReducer: persistedReducer,
  },
});
const persistor = persistStore(store);

export { store, persistor };
