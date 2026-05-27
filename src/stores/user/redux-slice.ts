import { createSlice } from "@reduxjs/toolkit";

import { IUserInfo } from "./data-type";

export const USER_SLICE = "user_slice";

interface IUserState {
  useInfo: IUserInfo;
}

export const initialState: IUserState = {
  useInfo: {
    id: 0,
    title: "",
  },
};

const userSlice = createSlice({
  name: USER_SLICE,
  initialState: {
    useInfo: initialState.useInfo,
  } as IUserState,
  reducers: {
    setInfoList: (state, action) => {
      state.useInfo = action.payload;
    },
  },
});

export const { setInfoList } = userSlice.actions;

export default userSlice.reducer;
