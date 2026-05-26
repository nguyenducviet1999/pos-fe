import { useCallback } from "react";

import { checkFunctionPermission, checkPermission } from "@src/utils";
import { useAppSelector } from "@src/stores";

export const useGetUserInfor = () => {
  const userInfor = useAppSelector((state) => state.globalState.userInfor);
  const checkUserFunctionPermission = useCallback(
    (functionPermision: string) => {
      checkFunctionPermission(userInfor?.permissions || [], functionPermision);
    },
    [userInfor?.permissions, checkFunctionPermission],
  );

  const checkUserPermission = useCallback(
    (permission: string, type?: string) => {
      const inputPermission = type ? `${permission}:${type}` : permission;
      return checkPermission(userInfor?.permissions || [], inputPermission);
    },
    [userInfor?.permissions, checkPermission],
  );
  return {
    userInfor,
    isAdmin: userInfor?.role === "admin",
    permissions: userInfor?.permissions || [],
    checkUserFunctionPermission,
    checkUserPermission,
  };
};
