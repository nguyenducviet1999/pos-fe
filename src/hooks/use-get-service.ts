import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { getSearchAll } from "@src/constants";
import { EnumQueryKeys } from "@src/enums";
import { EnumQuoteServiceItemProperties } from "@src/models";
import { EnumServiceItemProperties, EnumServiceTaskItemProperties } from "@src/models/service";
import { serviceRequests } from "@src/requests/api/service/service";

export const useGetService = (enabled = true, includeInactive = true) => {
  const { data, refetch, isFetching, isLoading } = useQuery({
    queryKey: [EnumQueryKeys.SERVICE_LIST_ALL],
    queryFn: () => serviceRequests.getList(getSearchAll(EnumServiceItemProperties.NAME)),
    enabled,
  });
  const options = useMemo(() => {
    return (
      data?.content
        ?.map((service) => ({
          label: `${service?.[EnumServiceItemProperties.CODE]} - ${service?.[EnumServiceItemProperties.NAME]} - ${
            service?.[EnumServiceItemProperties.PRICE]
          } €`,
          value: service?.[EnumServiceItemProperties.CODE],
          disabled: service?.[EnumServiceItemProperties.STATUS] === false,
        }))
        ?.filter((s) => {
          if (includeInactive) return true;
          return s.disabled === false;
        }) || []
    );
  }, [data]);

  const serviceData = useMemo(() => {
    return data?.content?.map((service) => ({
      ...service,
      [EnumQuoteServiceItemProperties.PRICE]: service[EnumServiceItemProperties.TASKS]?.reduce(
        (sum, task) => sum + (task[EnumServiceTaskItemProperties.PRICE] || 0),
        0,
      ),
    }));
  }, [data]);

  return { options, serviceData, refetch, isFetching, isLoading };
};
