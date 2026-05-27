export const searchAll = "?page=1&pageSize=9999";
export const getSearchAll = (
  orderBy: string,
  order: "ASC" | "DESC" = "ASC",
) => {
  return `?page=1&pageSize=9999&orderBy=${orderBy}&order=${order}`;
};
