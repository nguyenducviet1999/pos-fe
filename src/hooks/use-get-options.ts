import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { getOptionsByOptionData } from "@src/utils";
export enum EnumOptionSort {
  ASC = "asc",
  DESC = "desc",
}

export const useGetOption = (
  optionData: { label: any; value: any; disabled?: any }[],
  sort?: EnumOptionSort,
) => {
  const translate = useTranslation().t;
  const options = useMemo(() => {
    const result = getOptionsByOptionData(optionData, translate);
    if (sort === EnumOptionSort.ASC) {
      return result.sort((a, b) => a.label.localeCompare(b.label));
    } else if (sort === EnumOptionSort.DESC) {
      return result.sort((a, b) => b.label.localeCompare(a.label));
    }
    return result;
  }, [optionData, translate]);
  return options;
};
