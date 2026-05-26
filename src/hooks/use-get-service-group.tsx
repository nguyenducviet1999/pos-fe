import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { getSearchAll } from "@src/constants";
import { EnumQueryKeys } from "@src/enums";
import { EnumQuoteServiceItemProperties, EnumServiceGroupItemProperties } from "@src/models";
import { EnumServiceItemProperties } from "@src/models/service";
import { serviceGroupRequests } from "@src/requests/api/service-group";

export const useGetServiceGroup = (enabled = true, includeInactive = true) => {
  const { data, refetch, isFetching, isLoading } = useQuery({
    queryKey: [EnumQueryKeys.SERVICE_GROUPS_LIST],
    queryFn: () => serviceGroupRequests.getList(getSearchAll(EnumServiceGroupItemProperties.NAME)),
    enabled,
  });
  const options = useMemo(() => {
    return (
      data?.content
        ?.map((serviceGroup) => ({
          label: serviceGroup?.[EnumServiceGroupItemProperties.NAME],
          value: serviceGroup?.[EnumServiceGroupItemProperties.CODE],
          children: serviceGroup?.[EnumServiceGroupItemProperties.SERVICES]
            ?.map((serviceItem: any) => {
              const data = {
                ...serviceItem,
              };
              return {
                label: (
                  <span className={serviceItem?.[EnumServiceItemProperties.STATUS] === false ? "opacity-50" : ""}>{`${
                    serviceItem?.[EnumServiceGroupItemProperties.CODE]
                  } - ${serviceItem?.[EnumServiceGroupItemProperties.NAME]} - ${data[EnumQuoteServiceItemProperties.PRICE]} €`}</span>
                ),
                disabled: serviceItem?.[EnumServiceItemProperties.STATUS] === false,
                value: serviceItem?.[EnumServiceGroupItemProperties.CODE],
                data,
              };
            })
            .filter((s) => {
              if (includeInactive) return true;
              return s.disabled === false;
            }),
        }))
        ?.filter((s) => {
          if (includeInactive) return true;
          return s.children?.some((child) => child.disabled === false);
        }) || []
    );
  }, [data, includeInactive]);
  return { options, data, refetch, isFetching, isLoading };
};
