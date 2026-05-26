import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { createQueryString, queryStringToObject } from "@src/utils";

export const useQueryParams = () => {
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const queryParams = React.useMemo(() => queryStringToObject(search), [search]);

  const setQueryParams = (queryObj: any, replace = true) => {
    const filters: any = { ...queryObj };
    Object.keys(queryObj).forEach((element) => {
      if (!filters[element]) {
        delete filters[element];
      }
    });

    navigate(
      {
        pathname,
        search: createQueryString(filters),
      },
      {
        replace,
      },
    );
  };

  return { queryParams, setQueryParams };
};
