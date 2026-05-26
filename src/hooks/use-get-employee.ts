import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { getSearchAll, searchAll } from "@src/constants";
import { EnumQueryKeys } from "@src/enums";
import { EnumEmployeeItemProperties, IEmployeeItem } from "@src/models/employee";
import { employeeRequests } from "@src/requests/api/employee";

export const useGetEmployee = (enabled = true, includeInactive = true) => {
  const { data, refetch, isFetching, isLoading } = useQuery({
    queryKey: [EnumQueryKeys.EMPLOYEE_LIST_ALL],
    queryFn: () => employeeRequests.getList(getSearchAll(EnumEmployeeItemProperties.NAME)),
    enabled,
  });

  const options = useMemo(() => {
    return (
      (data?.content || [])
        .map((employee: IEmployeeItem) => ({
          label: employee[EnumEmployeeItemProperties.NAME],
          value: employee[EnumEmployeeItemProperties.SEQ],
          disabled: employee[EnumEmployeeItemProperties.ACTIVE] === false,
        }))
        ?.filter((s) => {
          if (includeInactive) return true;
          return s.disabled === false;
        }) || []
    );
  }, [data]);

  return { options, data, refetch, isFetching, isLoading };
};
