import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { getSearchAll } from "@src/constants";
import { EnumQueryKeys } from "@src/enums";
import { EnumSupplementItemProperties } from "@src/models";
import { supplementRequests } from "@src/requests/api";

export const supplementDefault = "Supplement";
export const supplementLabelDefault = "Supplément";
export const useGetSupplement = (enabled = true, includeInactive = true) => {
  // Implementation here
  const { data, refetch, isFetching, isLoading } = useQuery({
    queryKey: [EnumQueryKeys.SUPPLEMENT_LIST_ALL],
    queryFn: () => supplementRequests.getList(getSearchAll(EnumSupplementItemProperties.SERVICE_NAME)),
    enabled,
  });
  const options = useMemo(() => {
    return [
      {
        label: supplementLabelDefault,
        value: supplementDefault,
        [EnumSupplementItemProperties.SUGGESTION]: 0,
      },
      ...(data?.content
        ?.map((supplement) => ({
          label: supplement?.[EnumSupplementItemProperties.SERVICE_NAME],
          value: supplement?.[EnumSupplementItemProperties.SERVICE_CODE],
          disabled: supplement?.[EnumSupplementItemProperties.IS_ACTIVE] === false,
          [EnumSupplementItemProperties.SUGGESTION]: supplement?.[EnumSupplementItemProperties.SUGGESTION],
        }))
        ?.filter((s) => {
          if (includeInactive) return true;
          return s.disabled === false;
        }) || []),
    ];
  }, [data]);

  return { options, data, refetch, isFetching, isLoading };
};
