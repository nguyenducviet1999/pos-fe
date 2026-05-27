import { TFunction } from "i18next";
import { jwtDecode } from "jwt-decode";

import { IJWTPayload, ITreeNode } from "@src/models";

export function getFilenameFromUrl(url: string): string {
  const fileName = url?.split("/")?.pop();
  return fileName!;
}

export const checkedNodes = (nodes: ITreeNode[]) => {
  const selectedValues: string[] = [];
  const traverseNodes = (nodes: ITreeNode[]) => {
    nodes?.forEach((node) => {
      const isNodeChecked = node?.checked;
      if (isNodeChecked) {
        selectedValues.push(node.value!);
      }
      if (node.children) {
        traverseNodes(node.children);
      }
    });
  };
  traverseNodes(nodes);
  return selectedValues;
};

export const queryStringToObject = (queryString = "") => {
  const keyWithNumberValueList = ["page", "size"];
  const queryObject: any = {};
  // const parseQueryString = JSON.parse(queryString);
  queryString &&
    decodeURIComponent(queryString.replace("?", ""))
      .split("&")
      .forEach((itemString) => {
        const [itemKey, itemValue] = itemString.split("=");

        const value = keyWithNumberValueList.includes(itemKey)
          ? +itemValue
          : itemValue;

        if (queryObject[itemKey]) {
          if (Array.isArray(queryObject[itemKey])) {
            queryObject[itemKey] = [...queryObject[itemKey], value];
          } else {
            queryObject[itemKey] = [queryObject[itemKey], value];
          }
        } else {
          queryObject[itemKey] = value;
        }
      });
  return queryObject;
};

export const createQueryString = (queryObject: any) => {
  const queryString = Object.keys(queryObject)
    .filter(
      (key) =>
        queryObject[key] &&
        !(Array.isArray(queryObject[key]) && !queryObject[key].length),
    )
    .map((key) => {
      return Array.isArray(queryObject[key])
        ? queryObject[key]
            .map(
              (item: any) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(item)}`,
            )
            .join("&")
        : `${encodeURIComponent(key)}=${encodeURIComponent(queryObject[key])}`;
    })
    .join("&");
  return queryString ? `?${queryString}` : "";
};

// getNumericalOrder function by index, page, size
export const getNumericalOrder = (
  index: number,
  page?: number,
  size?: number,
) => {
  return (size || 10) * ((page || 1) - 1) + index + 1;
};
// getNumericalOrder DES function by index, page, size, total
export const getNumericalOrderDes = (
  index: number,
  page?: number,
  size?: number,
  total = 0,
) => {
  return total - ((size || 10) * ((page || 1) - 1) + index);
};

export const isNullOrUndefined = (value: any) =>
  value === null || value === undefined;

export const getOrdinalNumber = (number: number) => {
  const suffixes = ["th", "st", "nd", "rd"];
  const remainder10 = number % 10;
  const remainder100 = number % 100;

  // Special cases for 11th, 12th, 13th
  if (remainder100 >= 11 && remainder100 <= 13) {
    return `${number}th`;
  }

  // Determine suffix based on remainder10
  const suffix = suffixes[remainder10] || "th";
  return `${number}${suffix}`;
};
// get Options by mapData
export const getOptionsByMapData = (
  mapDataInput: any,
  translate: TFunction,
) => {
  const mapData = mapDataInput || {};
  return Object.keys(mapData).map((key) => {
    let labelInput = mapData?.[key]?.label ?? "";
    if (typeof labelInput === "string") {
      labelInput = [labelInput];
    }
    return {
      label: translate(...(labelInput as [any])),
      value: mapData?.[key]?.value,
    };
  });
};

export const getOptionsByOptionData = (
  inputOptionData: { label: any; value: any; disabled?: any }[],
  translate: TFunction,
) => {
  const optionData = inputOptionData || [];
  return optionData.map((item) => {
    let labelInput = item?.label ?? "";
    if (typeof labelInput === "string") {
      labelInput = [labelInput];
    }
    return {
      label: translate(...(labelInput as [any])),
      value: item?.value,
      disabled: item?.disabled ?? false,
    };
  });
};

export const getLabelInputOptionByValue = (
  value: any,
  inputOptionData: { label: any; value: any }[],
  translate?: TFunction,
) => {
  const optionData = inputOptionData || [];
  const foundOption = optionData.find((item) => item.value === value);
  if (translate) {
    return translate(foundOption ? foundOption.label : "");
  }
  return foundOption ? foundOption.label : "";
};

export const getJWTPayload = (accessToken: string) => {
  if (accessToken) {
    const jwtPayload: IJWTPayload = jwtDecode(accessToken);
    return jwtPayload;
  }
  return null;
};

export const groupListBy = (list: any[], getKey: (item: any) => string) => {
  return list.reduce(
    (acc, item) => {
      const key = getKey(item);
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(item);
      return acc;
    },
    {} as Record<string, any[]>,
  );
};

export const newFakeId = () => {
  return Math.abs(new Date().getTime()) * -1;
};

export const replaceExtensionFile = (
  fileName: string,
  oldExtension: string,
  newExtension: string,
) => {
  return fileName.replace(new RegExp(`\\${oldExtension}$`, "i"), newExtension);
};

export const checkLinkFileExist = async (url: string) => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch (error) {
    return false;
  }
};
export const checkBitValue = (sum: number, value: number) => {
  return (sum & value) === value;
};

export const getAvailableSystemByBit = (
  optionsData: {
    label: string;
    value: number;
  }[],
  system: number,
) => {
  return (
    optionsData.filter((option) => checkBitValue(system, option.value)) || []
  )
    ?.map((s) => s.label)
    .join(", ");
};

export const preloadImage = (src: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;

    img.onload = () => resolve(src);
    img.onerror = () => reject(new Error(`Failed to load: ${src}`));
  });
};

export const checkFunctionPermission = (
  permissions: string[],
  requiredFunctionPermission: string,
) => {
  return permissions.some((permission) =>
    permission.startsWith(requiredFunctionPermission),
  );
};

export const checkPermission = (
  permissions: string[],
  requiredPermission: string,
) => {
  return permissions.includes(requiredPermission);
};
