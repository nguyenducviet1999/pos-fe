import { useMemo } from "react";

import { useGetUserInfor } from "./use-get-user-infor";

export const useGetCheckPermission = (functionPermission: string, typePermission?: string) => {
  const { checkUserPermission } = useGetUserInfor();
  const checkPermission = useMemo(
    () => checkUserPermission(functionPermission, typePermission),
    [checkUserPermission, functionPermission, typePermission],
  );
  return checkPermission;
};
