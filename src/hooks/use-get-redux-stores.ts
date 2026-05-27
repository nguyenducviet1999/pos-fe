import { allReducerMapData, useAppSelector } from "@src/stores";
import { EnumStoreKeys } from "@src/stores/stores.constants";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

export const useGetReduxStores = (storeKey: EnumStoreKeys) => {
  const dispatch = useDispatch();
  const setData = allReducerMapData[storeKey].setData;
  const getData = useCallback(
    (key: string) =>
      useAppSelector((rootState: any) => {
        const state = rootState[storeKey];
        const path = key.split(".");
        let result = state;
        for (const p of path) {
          result = result?.[p];
        }
        return result;
      }),
    [storeKey],
  );

  return {
    setData: (data: any) => dispatch(setData(data)),
    getData,
  };
};
