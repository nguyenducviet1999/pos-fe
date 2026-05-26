import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";

import { getSearchAll } from "@src/constants";
import { EnumQueryKeys } from "@src/enums";
import { EnumPaymentMethodItemProperties, IPaymentMethodItem } from "@src/models";
import { paymentMethodRequests } from "@src/requests/api";

export const useGetPaymentMethods = (enabled = true, includeInactive = true) => {
  const { data, refetch, isFetching, isLoading } = useQuery({
    queryKey: [EnumQueryKeys.PAYMENT_METHODS_LIST_ALL],
    queryFn: () => paymentMethodRequests.getList(getSearchAll(EnumPaymentMethodItemProperties.NAME)),
    enabled,
  });

  const options = useMemo(() => {
    return (
      (data?.content || [])
        .map((paymentMethod: IPaymentMethodItem) => ({
          label: paymentMethod[EnumPaymentMethodItemProperties.NAME],
          value: paymentMethod[EnumPaymentMethodItemProperties.CODE],
          disabled: paymentMethod[EnumPaymentMethodItemProperties.ACTIVE] === false,
        }))
        ?.filter((s) => {
          if (includeInactive) return true;
          return s.disabled === false;
        }) || []
    );
  }, [data]);

  return { options, data, refetch, isFetching, isLoading };
};
