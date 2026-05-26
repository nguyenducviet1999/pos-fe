// import { useEffect } from "react";
// import { useQuery } from "@tanstack/react-query";

// import { EnumQueryKeys } from "@src/enums";
// import { userRequests } from "@src/requests/api/user/user";
// import { useAppDispatch, useAppSelector } from "@src/stores";
// import { setUserInfor } from "@src/stores/global/redux-slide";

// export const useFetchUserInfor = (enabled = true) => {
//   const dispatch = useAppDispatch();
//   const { data, refetch, isFetching, isLoading } = useQuery({
//     queryKey: [EnumQueryKeys.USER_PROFILE],
//     queryFn: () => userRequests.getUserProfile(),
//     enabled,
//   });
//   useEffect(() => {
//     if (data) {
//       dispatch(setUserInfor(data));
//     }
//   }, [data]);
//   return { data, refetch, isFetching, isLoading };
// };
