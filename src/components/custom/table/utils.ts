import type { ReactNode } from "react";

import { EnumSortValueTable } from "@src/enums";
import type { IPagination, TableSortState } from "@src/models/table";

export const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 25, 50, 100] as const;

export type TablePaginationChange = Pick<IPagination, "page" | "pageSize">;

export const getTotalPages = (total: number, pageSize: number) =>
  Math.max(1, Math.ceil(total / pageSize));

export const getPaginationRange = (
  currentPage: number,
  totalPages: number,
  siblingCount = 1,
): Array<number | "ellipsis"> => {
  if (totalPages <= 1) {
    return [1];
  }

  const totalPageNumbers = siblingCount * 2 + 5;

  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);
  const shouldShowLeftEllipsis = leftSibling > 2;
  const shouldShowRightEllipsis = rightSibling < totalPages - 1;

  const pages: Array<number | "ellipsis"> = [1];

  if (shouldShowLeftEllipsis) {
    pages.push("ellipsis");
  } else {
    for (let page = 2; page < leftSibling; page += 1) {
      pages.push(page);
    }
  }

  for (let page = leftSibling; page <= rightSibling; page += 1) {
    if (page !== 1 && page !== totalPages) {
      pages.push(page);
    }
  }

  if (shouldShowRightEllipsis) {
    pages.push("ellipsis");
  } else {
    for (let page = rightSibling + 1; page < totalPages; page += 1) {
      pages.push(page);
    }
  }

  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
};

export const getNextSortState = (
  current: TableSortState | undefined,
  orderBy: string,
): TableSortState => {
  if (!current || current.orderBy !== orderBy) {
    return { orderBy, order: EnumSortValueTable.ASC };
  }

  if (current.order === EnumSortValueTable.ASC) {
    return { orderBy, order: EnumSortValueTable.DESC };
  }

  return { orderBy, order: EnumSortValueTable.ASC };
};

export const getColumnSortKey = <T>(column: {
  key: keyof T | (string & {});
  sortKey?: string;
}) => column.sortKey ?? String(column.key);

export const getRowKeyValue = <T>(
  record: T,
  index: number,
  rowKey: keyof T | ((record: T) => string | number),
) => {
  if (typeof rowKey === "function") {
    return String(rowKey(record));
  }

  const value = record[rowKey];
  return value === undefined || value === null ? String(index) : String(value);
};

export const getCellValue = <T>(
  record: T,
  column: {
    key: keyof T | (string & {});
    render?: (row: T, index: number) => ReactNode;
  },
  index: number,
) => {
  if (column.render) {
    return column.render(record, index);
  }

  const value = record[column.key as keyof T];
  return value === undefined || value === null ? "" : String(value);
};
