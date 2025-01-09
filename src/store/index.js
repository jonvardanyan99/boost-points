import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { resetStore } from './slices/app/actions';
import { userReducer } from './slices/user';

const appReducer = combineSlices({
  user: userReducer,
});

const rootReducer = (state, action) => {
  if (action.type === resetStore.type) {
    state = undefined;
  }

  return appReducer(state, action);
};

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedRootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);
