import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { ctEnvSite } from "@src/constants";

import { globalReducer } from "./global";
// import { tournamentReducer } from "@src/modules/gtour";
// import { userReducer } from "@src/stores/user";

export const allReducers = combineReducers({
  globalState: globalReducer,
  // userState: userReducer,
  // tournamentState: tournamentReducer,
});

const rootReducer = (state: any, action: any) => {
  return allReducers(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  devTools: __APP_ENV__.DEV_MODE !== ctEnvSite.PRODUCTION,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        isSerializable: (value: any) => {
          return true; // allow all data type
        },
      },
      // serializableCheck: false, // Don't show warning if data is type dayjs
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
