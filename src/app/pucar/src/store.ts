import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import caronas from "./reducers/caronas.slice";
import caronaDetail from "./reducers/caronaDetail.slice";
import caronaActive from "./reducers/caronaActive.slice";
import caronasList from "./reducers/caronasList.slice";
import actionIndex from "./reducers/actionIndex.slice";
import auth from "./reducers/auth.slice";

const reducers = combineReducers({
  caronas,
  caronaDetail,
  caronasList,
  auth,
  actionIndex,
  caronaActive,
});

const persistConfig = {
  key: "pucar",
  storage,
  blacklist: ["caronas", "caronaDetail", "caronasList", "caronaActive"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  // middleware: getDefaultMiddleware({
  //   serializableCheck: {
  //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //   },
  // }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
