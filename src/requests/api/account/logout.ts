import axios from "@src/requests";

const logout = async () => {
  const response = await axios.post("/auth/logout", {});
  return response;
};

export const accountRequest = {
  logout,
};
