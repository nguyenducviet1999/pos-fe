import { useQuery } from "@tanstack/react-query";

import { EnumQueryKeys } from "@src/enums";
import { workShiftRequests } from "@src/requests/api/work-shift";

export const useGetCurrentWorkShift = (enabled: any) => {
  const { data, refetch, isFetching, isLoading } = useQuery({
    queryKey: [EnumQueryKeys.WORK_SHIFT_CURRENT],
    queryFn: () => workShiftRequests.getCurrentSession(),
    enabled,
  });
  return { data, refetch, isFetching, isLoading };
};
