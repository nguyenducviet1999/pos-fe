import { userRequests } from "@src/requests/api/user/info";
import { AppDispatch, RootState } from "@src/stores/root-stores";

import { setInfoList } from "./redux-slice";

export const fetchUserInfo =
  (id: number) =>
  async (dispatch: AppDispatch, getState: () => RootState): Promise<void> => {
    const params = {
      id,
    };
    const result = await userRequests.getUserInfo(params);
    if (result) {
      const data = {
        id: result.id,
        title: result.title,
      };
      dispatch(setInfoList(data));
    }
  };
