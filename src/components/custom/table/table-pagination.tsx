import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { Combobox } from "@src/components/custom/combobox";
import {
  DEFAULT_PAGE_SIZE_OPTIONS,
  getPaginationRange,
  getTotalPages,
  type TablePaginationChange,
} from "@src/components/custom/table/utils";
import type { IPagination } from "@src/models/table";
import { cn } from "@src/lib/utils";

export type TablePaginationProps = IPagination & {
  pageSizeOptions?: readonly number[];
  onChange: (pagination: TablePaginationChange) => void;
  className?: string;
};

function TablePagination({
  page,
  pageSize,
  total,
  pageSizeOptions = DEFAULT_PAGE_SIZE_OPTIONS,
  onChange,
  className,
}: TablePaginationProps) {
  const { t } = useTranslation();
  const totalPages = getTotalPages(total, pageSize);
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const pages = getPaginationRange(safePage, totalPages);
  const sizeOptions = useMemo(() => {
    if (pageSizeOptions.includes(pageSize)) {
      return pageSizeOptions;
    }

    return [...pageSizeOptions, pageSize].sort((a, b) => a - b);
  }, [pageSize, pageSizeOptions]);

  const pageSizeComboboxOptions = useMemo(
    () =>
      sizeOptions.map((option) => ({ label: option, value: String(option) })),
    [sizeOptions],
  );

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages || nextPage === safePage) {
      return;
    }

    onChange({ page: nextPage, pageSize });
  };

  const handlePageSizeChange = (nextPageSize: string) => {
    const parsedPageSize = Number(nextPageSize);

    if (parsedPageSize === pageSize) {
      return;
    }

    onChange({ page: 1, pageSize: parsedPageSize });
  };

  return (
    <div
      className={cn(
        "mt-7 mb-4 flex flex-wrap items-center justify-center gap-2 text-sm",
        className,
      )}
    >
      <span className="text-muted-foreground">{t("table.SHOW")}</span>

      <Combobox
        className="w-[85px]"
        value={String(pageSize)}
        options={pageSizeComboboxOptions}
        onChange={handlePageSizeChange}
      />

      <span className="text-muted-foreground">
        {t("table.TOTAL", { total })}
      </span>

      {pages.map((item, index) =>
        item === "ellipsis" ? (
          <span
            key={`ellipsis-${index}`}
            className="min-w-6 px-1 text-muted-foreground"
          >
            ...
          </span>
        ) : (
          <button
            key={item}
            type="button"
            onClick={() => handlePageChange(item)}
            className={cn(
              "min-w-6 px-1 transition-colors",
              item === safePage
                ? "font-semibold text-primary"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {item}
          </button>
        ),
      )}
    </div>
  );
}

export { TablePagination };
