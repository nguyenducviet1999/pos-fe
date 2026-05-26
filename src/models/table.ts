import { ReactNode } from "react";

export interface TableColumn<RecordType = unknown> {
  key: keyof RecordType | "";
  header: string;
  render?: (row: RecordType) => string | ReactNode | JSX.Element;
  colSpan?: number;
  rowSpan?: number;
  headerClassName?: string;
  cellClassName?: string;
  fixed?: boolean;
  sortable?: boolean;
  onSortable?: () => void;
  children?: TableColumn<RecordType>[];
  expanded?: boolean;
}

export interface IPagination {
  page: number;
  rows: number;
}
