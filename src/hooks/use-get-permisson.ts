import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { getSearchAll } from "@src/constants";
import { EnumQueryKeys } from "@src/enums";
import { EnumPermissionItemProperties } from "@src/models/permission";
import { permissonRequests } from "@src/requests/api/employee/permisson";

export const useGetPermission = (enabled: any, includeInactive = true) => {
  const { data, refetch, isFetching, isLoading } = useQuery({
    queryKey: [EnumQueryKeys.PERMISSIONS_LIST_ALL],
    queryFn: () => permissonRequests.getList(getSearchAll(EnumPermissionItemProperties.PERMISSION)),
    enabled,
  });
  const options = useMemo(() => {
    return (
      data?.content
        ?.map((perm) => ({
          label: perm?.[EnumPermissionItemProperties.PERMISSION],
          value: perm?.[EnumPermissionItemProperties.PERMISSION_CODE],
          disabled: perm?.[EnumPermissionItemProperties.ACTIVE] === false,
        }))
        ?.filter((s) => {
          if (includeInactive) return true;
          return s.disabled === false;
        }) || []
    );
  }, [data]);
  return { options, data, refetch, isFetching, isLoading };
};
