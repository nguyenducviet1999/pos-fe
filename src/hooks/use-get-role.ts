import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { getSearchAll } from "@src/constants";
import { EnumQueryKeys } from "@src/enums";
import { EnumRoleItemProperties, IRoleItem } from "@src/models/role";
import { roleRequests } from "@src/requests/api/employee";

export const useGetRole = (enabled?: any) => {
  const { data, refetch, isFetching, isLoading } = useQuery({
    queryKey: [EnumQueryKeys.ROLE_LIST_ALL],
    queryFn: () => roleRequests.getList(getSearchAll(EnumRoleItemProperties.NAME)),
    enabled,
  });

  const options = useMemo(() => {
    return (
      (data?.content || []).map((role: IRoleItem) => ({
        label: role[EnumRoleItemProperties.NAME],
        value: role[EnumRoleItemProperties.CODE],
      })) || []
    );
  }, [data]);

  return { options, data, refetch, isFetching, isLoading };
};
