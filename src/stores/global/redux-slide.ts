import { createSlice } from "@reduxjs/toolkit";

import { IGlobalInfo } from "./data-type";

export const GLOBAL_SLICE = "global_slice";

export const initialState: IGlobalInfo = {
  currentSession: null,
  userInfor: null,
  totalQuote: { completed: 0, waiting: 0 },
};

const globalSlice = createSlice({
  name: GLOBAL_SLICE,
  initialState,
  reducers: {
    setCurrentSession: (state, action) => {
      state.currentSession = action.payload;
    },
    setTotalQuote: (state, action) => {
      state.totalQuote = action.payload;
    },
    setUserInfor: (state, action) => {
      state.userInfor = action.payload;
    },
  },
});

export const { setCurrentSession, setTotalQuote, setUserInfor } =
  globalSlice.actions;
export default globalSlice.reducer;
