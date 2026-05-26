import axios from "@src/requests";
import { IUserInfoParams } from "@src/requests/api/user/prop-state.type";

const getUserInfo = async (params: IUserInfoParams) => {
  const response = await axios.get(`/products/${params.id}`);
  return response.data;
};

export const userRequests = {
  getUserInfo,
};
