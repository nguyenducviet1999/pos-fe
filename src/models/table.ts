import type { ReactNode } from "react";

import { EnumSortValueTable } from "@src/enums";

export type TableColumnAlign = "left" | "center" | "right";

export interface TableColumn<RecordType = unknown> {
  key: keyof RecordType | (string & {});
  header: ReactNode;
  render?: (row: RecordType, index: number) => ReactNode;
  sortable?: boolean;
  sortKey?: string;
  width?: number | string;
  align?: TableColumnAlign;
  headerClassName?: string;
  cellClassName?: string;
  hidden?: boolean;
}

export interface TableSortState {
  orderBy: string;
  order: EnumSortValueTable;
}

export interface IPagination {
  page: number;
  pageSize: number;
  total: number;
}
