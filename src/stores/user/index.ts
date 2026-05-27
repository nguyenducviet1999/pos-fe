import { RootState } from "@src/stores";

import { IUserInfo } from "./data-type";
import { fetchUserInfo } from "./middleware";
import userReducer, { setInfoList } from "./redux-slice";

// export const selectUserInfo = (state: RootState): IUserInfo => state.userState.useInfo;

export { fetchUserInfo, setInfoList, userReducer };
export type { IUserInfo };
