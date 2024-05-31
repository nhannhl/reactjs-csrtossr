// import { configureStore } from "@reduxjs/toolkit";
// import storage from "redux-persist/lib/storage";
// import {
//   persistReducer,
//   persistStore,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import { combineReducers } from "redux";

// import userReducer from "./userSlice";
// import postReducer from "./postSlice";

// const rootReducers = combineReducers({
//   user: userReducer,
//   post: postReducer
// });

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["user"],
// };

// const persistedReducer = persistReducer(persistConfig, rootReducers);

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) => {
//     let middleware = getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//         isSerializable: () => true
//       },
//     });
//     return middleware;
//   }
// });

// export const persistore = persistStore(store);
// export default store;

import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { combineReducers } from 'redux';
import userReducer from './userSlice';
import postReducer from './postSlice';

const rootReducers = combineReducers({
  user: userReducer,
  post: postReducer
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const persistedReducer = persistReducer(persistConfig, rootReducers);

const createStore = (preloadedState) => configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      isSerializable: () => true
    },
  }),
  preloadedState
});

export const initializeStore = (preloadedState) => createStore(preloadedState);
export const persistor = persistStore(createStore());
export default createStore();
