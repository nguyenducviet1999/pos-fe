import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {
  ActionCreatorWithPayload,
  combineReducers,
  configureStore,
  Reducer,
} from "@reduxjs/toolkit";

// import { globalReducer } from "./global";
import { getSlice } from "./redux-slide";
import { EnumStoreKeys, storesInitialState } from "./stores.constants";

function getAllReducers() {
  const result: Record<
    EnumStoreKeys,
    {
      setData: ActionCreatorWithPayload<any, string>;
      reducer: Reducer<any>;
    }
  > = {} as Record<EnumStoreKeys, any>;
  for (const key of Object.values(EnumStoreKeys)) {
    result[key] = getSlice(key, storesInitialState[key]);
  }
  return result;
}

export const allReducerMapData = getAllReducers();
const allReducerCombineInput = Object.keys(allReducerMapData).reduce(
  (acc, key) => {
    acc[key as EnumStoreKeys] = allReducerMapData[key as EnumStoreKeys].reducer;
    return acc;
  },
  {} as Record<EnumStoreKeys, Reducer<any>>,
);

export const store = configureStore({
  reducer: combineReducers({
    ...allReducerCombineInput,
  }),
  devTools: APP_ENV.MODE !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        isSerializable: (value: any) => {
          return true; // allow all data type
        },
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
