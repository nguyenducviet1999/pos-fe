import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from "lucide-react";

import { TablePagination } from "@src/components/custom/table/table-pagination";
import {
  getCellValue,
  getColumnSortKey,
  getNextSortState,
  getRowKeyValue,
  type TablePaginationChange,
} from "@src/components/custom/table/utils";
import { Spinner } from "@src/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@src/components/ui/table";
import { EnumSortValueTable } from "@src/enums";
import { cn } from "@src/lib/utils";
import type {
  IPagination,
  TableColumn,
  TableSortState,
} from "@src/models/table";

export type DataTableProps<T> = {
  columns: TableColumn<T>[];
  dataSource: T[];
  rowKey: keyof T | ((record: T) => string | number);
  loading?: boolean;
  emptyText?: ReactNode;
  className?: string;
  tableClassName?: string;
  pagination?: IPagination | false;
  onPaginationChange?: (pagination: TablePaginationChange) => void;
  sort?: TableSortState;
  onSortChange?: (sort: TableSortState) => void;
  stickyHeader?: boolean;
};

const alignClassName = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
} as const;

function SortIcon({
  active,
  order,
}: {
  active: boolean;
  order?: EnumSortValueTable;
}) {
  if (!active) {
    return <ArrowUpDownIcon className="size-3.5 opacity-50" />;
  }

  if (order === EnumSortValueTable.DESC) {
    return <ArrowDownIcon className="size-3.5 text-primary" />;
  }

  return <ArrowUpIcon className="size-3.5 text-primary" />;
}

function DataTable<T>({
  columns,
  dataSource,
  rowKey,
  loading = false,
  emptyText,
  className,
  tableClassName,
  pagination,
  onPaginationChange,
  sort,
  onSortChange,
  stickyHeader = false,
}: DataTableProps<T>) {
  const { t } = useTranslation();
  const visibleColumns = columns.filter((column) => !column.hidden);

  const handleSort = (column: TableColumn<T>) => {
    if (!column.sortable || !onSortChange) {
      return;
    }

    onSortChange(getNextSortState(sort, getColumnSortKey(column)));
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="overflow-hidden rounded-3xl border bg-card shadow-sm">
        <Table className={tableClassName}>
          <TableHeader
            className={cn(
              stickyHeader && "sticky top-0 z-10 bg-card backdrop-blur-sm",
            )}
          >
            <TableRow className="hover:bg-transparent">
              {visibleColumns.map((column) => {
                const sortKey = getColumnSortKey(column);
                const isSorted = sort?.orderBy === sortKey;

                return (
                  <TableHead
                    key={String(column.key)}
                    style={column.width ? { width: column.width } : undefined}
                    className={cn(
                      alignClassName[column.align ?? "left"],
                      column.headerClassName,
                      column.sortable &&
                        onSortChange &&
                        "cursor-pointer select-none",
                    )}
                    onClick={
                      column.sortable && onSortChange
                        ? () => handleSort(column)
                        : undefined
                    }
                  >
                    <div
                      className={cn(
                        "inline-flex items-center gap-1.5",
                        column.align === "center" && "justify-center",
                        column.align === "right" && "justify-end",
                      )}
                    >
                      <span>{column.header}</span>
                      {column.sortable && onSortChange ? (
                        <SortIcon active={isSorted} order={sort?.order} />
                      ) : null}
                    </div>
                  </TableHead>
                );
              })}
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={visibleColumns.length}
                  className="h-40 text-center"
                >
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Spinner />
                  </div>
                </TableCell>
              </TableRow>
            ) : dataSource.length ? (
              dataSource.map((record, rowIndex) => (
                <TableRow key={getRowKeyValue(record, rowIndex, rowKey)}>
                  {visibleColumns.map((column) => (
                    <TableCell
                      key={String(column.key)}
                      style={column.width ? { width: column.width } : undefined}
                      className={cn(
                        alignClassName[column.align ?? "left"],
                        column.cellClassName,
                      )}
                    >
                      {getCellValue(record, column, rowIndex)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={visibleColumns.length}
                  className="h-32 text-center text-muted-foreground"
                >
                  {emptyText ?? t("table.NO_DATA")}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {pagination !== false && onPaginationChange ? (
        <TablePagination {...pagination} onChange={onPaginationChange} />
      ) : null}
    </div>
  );
}

export { DataTable };
