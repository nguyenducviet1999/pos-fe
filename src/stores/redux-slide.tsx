import { createSlice } from "@reduxjs/toolkit";
import { EnumStoreKeys } from "./stores.constants";

export const getSlice = (key: EnumStoreKeys, initialState: any) => {
  const slidce = createSlice({
    name: key,
    initialState,
    reducers: {
      setData: (state, action) => {
        Object.keys(state).forEach((key) => {
          state[key] = action.payload[key];
        });
        return state;
      },
    },
  });
  return {
    setData: slidce.actions.setData,
    reducer: slidce.reducer,
  };
};
