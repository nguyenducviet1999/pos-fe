import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

type IObjectKeys = {
  [key: string]: any;
};
interface IObjectOptionSearch {
  pathname?: string;
  replace?: boolean;
  isSearch?: boolean;
}

export const useUpdateSearchParams = <T>(keysTypeArray?: string[], keysTypeNumber?: string[]) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const isFirstRender = useRef(true);

  /* Start convert param to object value before componentDidMount run */
  const dataStamp = () => {
    const params: any = {};
    for (const [key, value] of searchParams.entries()) {
      let exactValue: any = value;
      if (keysTypeNumber && keysTypeNumber.includes(key)) {
        exactValue = Number(exactValue);
      }
      // Conver "&categoryType=EVENT&categoryType=COURSE_POSTER"  to   "categoryType: [EVENT,COURSE_POSTER]"
      if (keysTypeArray && keysTypeArray.includes(key) && !params[key]) {
        params[key] = [exactValue];
      } else if (params[key] && Array.isArray(params[key])) {
        params[key].push(exactValue);
      } else {
        params[key] = exactValue;
      }
    }
    return params;
  };
  const [searchParamsObject, setSearchParamsObject] = useState<any>(dataStamp);
  /* End convert param to object value before componentDidMount run */

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const dataParam = dataStamp();
    setSearchParamsObject(dataParam);
  }, [searchParams, isFirstRender]);

  const redirectUpdateSearchParams = (newParams: IObjectKeys, options?: IObjectOptionSearch) => {
    // For redirect
    if (options?.pathname) {
      const pathSearch = { pathname: options?.pathname, ...(newParams && { search: new URLSearchParams(newParams).toString() }) };
      navigate(pathSearch, { replace: options?.replace });
      return;
    }
    // For update param Search
    const objectData: any = {
      ...newParams,
      ...(options?.isSearch && { page: 1, pageSize: 10 }),
    };
    Object.keys(objectData).forEach((element) => {
      const dataElement = objectData[element];
      if (dataElement === undefined || dataElement === null || dataElement === "") {
        searchParams.delete(element);
        return;
      }

      if (Array.isArray(dataElement)) {
        searchParams.delete(element);
        for (const item of dataElement) {
          searchParams.append(element, item);
        }
      } else {
        searchParams.set(element, dataElement);
      }
    });
    setSearchParams(searchParams, { replace: true });
  };

  return { searchParamsObject, setSearchParamsObject, redirectUpdateSearchParams };
};
