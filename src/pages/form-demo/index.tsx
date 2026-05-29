import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  CheckboxGroup,
  DatePicker,
  DateRangePicker,
  Input,
  MultiSelect,
  RadioGroup,
  Select,
  TextArea,
  type DateRangeValue,
} from "@src/components/custom/form";
import { DataTable } from "@src/components/custom/table";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { cn } from "@src/lib/utils";
import { EnumSortValueTable } from "@src/enums";
import type { TableColumn, TableSortState } from "@src/models/table";

enum EnumDemoEmployeeProperties {
  ID = "id",
  NAME = "name",
  ROLE = "role",
  STATUS = "status",
  BOOKINGS = "bookings",
}

interface IDemoEmployee {
  [EnumDemoEmployeeProperties.ID]: number;
  [EnumDemoEmployeeProperties.NAME]: string;
  [EnumDemoEmployeeProperties.ROLE]: string;
  [EnumDemoEmployeeProperties.STATUS]: "active" | "inactive";
  [EnumDemoEmployeeProperties.BOOKINGS]: number;
}

const demoEmployees: IDemoEmployee[] = [
  {
    [EnumDemoEmployeeProperties.ID]: 1,
    [EnumDemoEmployeeProperties.NAME]: "Anna Nguyen",
    [EnumDemoEmployeeProperties.ROLE]: "staff",
    [EnumDemoEmployeeProperties.STATUS]: "active",
    [EnumDemoEmployeeProperties.BOOKINGS]: 24,
  },
  {
    [EnumDemoEmployeeProperties.ID]: 2,
    [EnumDemoEmployeeProperties.NAME]: "Maria Lopez",
    [EnumDemoEmployeeProperties.ROLE]: "manager",
    [EnumDemoEmployeeProperties.STATUS]: "active",
    [EnumDemoEmployeeProperties.BOOKINGS]: 18,
  },
  {
    [EnumDemoEmployeeProperties.ID]: 3,
    [EnumDemoEmployeeProperties.NAME]: "Jenny Tran",
    [EnumDemoEmployeeProperties.ROLE]: "staff",
    [EnumDemoEmployeeProperties.STATUS]: "inactive",
    [EnumDemoEmployeeProperties.BOOKINGS]: 9,
  },
  {
    [EnumDemoEmployeeProperties.ID]: 4,
    [EnumDemoEmployeeProperties.NAME]: "Sophie Kim",
    [EnumDemoEmployeeProperties.ROLE]: "staff",
    [EnumDemoEmployeeProperties.STATUS]: "active",
    [EnumDemoEmployeeProperties.BOOKINGS]: 31,
  },
  {
    [EnumDemoEmployeeProperties.ID]: 5,
    [EnumDemoEmployeeProperties.NAME]: "Emily Chen",
    [EnumDemoEmployeeProperties.ROLE]: "manager",
    [EnumDemoEmployeeProperties.STATUS]: "active",
    [EnumDemoEmployeeProperties.BOOKINGS]: 15,
  },
];

const initialState = {
  name: "Jane Doe",
  email: "",
  note: "",
  role: "staff" as string | undefined,
  skills: ["nails"] as string[],
  plan: "basic",
  planHorizontal: "pro",
  services: ["manicure"] as string[],
  date: null as string | null,
  dateRange: { from: null, to: null } as DateRangeValue,
  showErrors: false,
  tablePagination: { page: 1, pageSize: 10, total: demoEmployees.length },
  tableSort: {
    orderBy: EnumDemoEmployeeProperties.NAME,
    order: EnumSortValueTable.ASC,
  } as TableSortState,
  tableLoading: false,
  tableShowData: true,
};

const FormDemoPage: React.FC = () => {
  const { t } = useTranslation();
  const [state, setState] = useState(initialState);

  const roleOptions = useMemo(
    () => [
      { label: t("form_demo.ROLE_STAFF"), value: "staff" },
      {
        label: t("form_demo.ROLE_MANAGER"),
        value: "manager",
        description: t("form_demo.ROLE_MANAGER_DESC"),
      },
      {
        label: t("form_demo.ROLE_OWNER"),
        value: "owner",
        disabled: true,
      },
    ],
    [t],
  );

  const skillOptions = useMemo(
    () => [
      { label: t("form_demo.SKILL_NAILS"), value: "nails" },
      { label: t("form_demo.SKILL_SPA"), value: "spa" },
      { label: t("form_demo.SKILL_LASH"), value: "lash" },
    ],
    [t],
  );

  const planOptions = useMemo(
    () => [
      { label: t("form_demo.PLAN_BASIC"), value: "basic" },
      { label: t("form_demo.PLAN_PRO"), value: "pro" },
      { label: t("form_demo.PLAN_ENTERPRISE"), value: "enterprise" },
    ],
    [t],
  );

  const serviceOptions = useMemo(
    () => [
      { label: t("form_demo.SERVICE_MANICURE"), value: "manicure" },
      { label: t("form_demo.SERVICE_PEDICURE"), value: "pedicure" },
      { label: t("form_demo.SERVICE_GEL"), value: "gel" },
      { label: t("form_demo.SERVICE_ACRYLIC"), value: "acrylic" },
    ],
    [t],
  );

  const tableColumns = useMemo<TableColumn<IDemoEmployee>[]>(
    () => [
      {
        key: EnumDemoEmployeeProperties.NAME,
        header: t("form_demo.TABLE_NAME"),
        sortable: true,
      },
      {
        key: EnumDemoEmployeeProperties.ROLE,
        header: t("form_demo.FIELD_ROLE"),
        sortable: true,
        render: (row) =>
          t(
            `form_demo.ROLE_${row[EnumDemoEmployeeProperties.ROLE].toUpperCase()}`,
          ),
      },
      {
        key: EnumDemoEmployeeProperties.STATUS,
        header: t("form_demo.TABLE_STATUS"),
        sortable: true,
        render: (row) => (
          <Badge
            variant={
              row[EnumDemoEmployeeProperties.STATUS] === "active"
                ? "default"
                : "secondary"
            }
          >
            {t(
              `form_demo.STATUS_${row[EnumDemoEmployeeProperties.STATUS].toUpperCase()}`,
            )}
          </Badge>
        ),
      },
      {
        key: EnumDemoEmployeeProperties.BOOKINGS,
        header: t("form_demo.TABLE_BOOKINGS"),
        sortable: true,
        align: "right",
        cellClassName: "tabular-nums",
      },
    ],
    [t],
  );

  const sortedEmployees = useMemo(() => {
    const sorted = [...demoEmployees];
    const { orderBy, order } = state.tableSort;

    sorted.sort((a, b) => {
      const left = a[orderBy as EnumDemoEmployeeProperties];
      const right = b[orderBy as EnumDemoEmployeeProperties];

      if (typeof left === "number" && typeof right === "number") {
        return order === EnumSortValueTable.ASC ? left - right : right - left;
      }

      return order === EnumSortValueTable.ASC
        ? String(left).localeCompare(String(right))
        : String(right).localeCompare(String(left));
    });

    return sorted;
  }, [state.tableSort]);

  const pagedEmployees = useMemo(() => {
    const { page, pageSize } = state.tablePagination;
    const start = (page - 1) * pageSize;
    return sortedEmployees.slice(start, start + pageSize);
  }, [sortedEmployees, state.tablePagination]);

  const preview = useMemo(
    () =>
      JSON.stringify(
        {
          name: state.name,
          email: state.email,
          note: state.note,
          role: state.role,
          skills: state.skills,
          plan: state.plan,
          planHorizontal: state.planHorizontal,
          services: state.services,
          date: state.date,
          dateRange: state.dateRange,
          tablePagination: state.tablePagination,
          tableSort: state.tableSort,
          tableLoading: state.tableLoading,
          tableShowData: state.tableShowData,
        },
        null,
        2,
      ),
    [state],
  );

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 md:py-10">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-primary">
            {t("form_demo.EYEBROW")}
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            {t("form_demo.TITLE")}
          </h1>
          <p className="max-w-2xl text-sm text-muted-foreground">
            {t("form_demo.SUBTITLE")}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() =>
              setState((prev) => ({ ...prev, showErrors: !prev.showErrors }))
            }
          >
            {state.showErrors
              ? t("form_demo.HIDE_ERRORS")
              : t("form_demo.SHOW_ERRORS")}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => setState(initialState)}
          >
            {t("form_demo.RESET")}
          </Button>
        </div>
      </div>

      <section className="mb-6 rounded-3xl border bg-card p-6 shadow-sm">
        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="mb-1 text-lg font-semibold">
              {t("form_demo.SECTION_TABLE")}
            </h2>
            <p className="max-w-3xl text-sm text-muted-foreground">
              {t("form_demo.SECTION_TABLE_DESC")}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setState((prev) => ({ ...prev, tableLoading: true }));
                window.setTimeout(() => {
                  setState((prev) => ({ ...prev, tableLoading: false }));
                }, 800);
              }}
            >
              {t("form_demo.TABLE_TOGGLE_LOADING")}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() =>
                setState((prev) => ({
                  ...prev,
                  tableShowData: !prev.tableShowData,
                }))
              }
            >
              {t("form_demo.TABLE_TOGGLE_EMPTY")}
            </Button>
          </div>
        </div>
        <DataTable
          columns={tableColumns}
          dataSource={state.tableShowData ? pagedEmployees : []}
          rowKey={EnumDemoEmployeeProperties.ID}
          loading={state.tableLoading}
          sort={state.tableSort}
          pagination={state.tablePagination}
          onSortChange={(sort) =>
            setState((prev) => ({ ...prev, tableSort: sort }))
          }
          onPaginationChange={(pagination) =>
            setState((prev) => ({
              ...prev,
              tablePagination: {
                ...prev.tablePagination,
                ...pagination,
              },
            }))
          }
        />
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <section className="rounded-3xl border bg-card p-6 shadow-sm">
            <h2 className="mb-1 text-lg font-semibold">
              {t("form_demo.SECTION_TEXT")}
            </h2>
            <p className="mb-5 text-sm text-muted-foreground">
              {t("form_demo.SECTION_TEXT_DESC")}
            </p>
            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label={t("form_demo.FIELD_NAME")}
                description={t("form_demo.FIELD_NAME_DESC")}
                value={state.name}
                onChange={(value) =>
                  setState((prev) => ({ ...prev, name: value }))
                }
                error={
                  state.showErrors && !state.name.trim()
                    ? t("validation.EMAIL_REQUIRED")
                    : undefined
                }
              />
              <Input
                label={t("commons.EMAIL_ADDRESS")}
                type="email"
                placeholder={t("login.EMAIL_PLACEHOLDER")}
                value={state.email}
                onChange={(value) =>
                  setState((prev) => ({ ...prev, email: value }))
                }
                error={
                  state.showErrors && !state.email
                    ? t("validation.EMAIL_REQUIRED")
                    : undefined
                }
              />
              <div className="md:col-span-2">
                <TextArea
                  label={t("form_demo.FIELD_NOTE")}
                  description={t("form_demo.FIELD_NOTE_DESC")}
                  value={state.note}
                  onChange={(value) =>
                    setState((prev) => ({ ...prev, note: value }))
                  }
                  rows={4}
                />
              </div>
            </div>
          </section>

          <section className="rounded-3xl border bg-card p-6 shadow-sm">
            <h2 className="mb-1 text-lg font-semibold">
              {t("form_demo.SECTION_SELECT")}
            </h2>
            <p className="mb-5 text-sm text-muted-foreground">
              {t("form_demo.SECTION_SELECT_DESC")}
            </p>
            <div className="grid gap-5 md:grid-cols-2">
              <Select
                label={t("form_demo.FIELD_ROLE")}
                value={state.role}
                onChange={(value) =>
                  setState((prev) => ({ ...prev, role: value }))
                }
                options={roleOptions}
                placeholder={t("commons.SELECT_PLACEHOLDER")}
                required
              />
              <MultiSelect
                label={t("form_demo.FIELD_SERVICES")}
                value={state.services}
                onChange={(value) =>
                  setState((prev) => ({ ...prev, services: value }))
                }
                options={serviceOptions}
                placeholder={t("commons.SELECT_PLACEHOLDER")}
                searchPlaceholder={t("commons.SEARCH")}
                emptyText={t("commons.NO_RESULTS")}
              />
            </div>
          </section>

          <section className="rounded-3xl border bg-card p-6 shadow-sm">
            <h2 className="mb-1 text-lg font-semibold">
              {t("form_demo.SECTION_GROUP")}
            </h2>
            <p className="mb-5 text-sm text-muted-foreground">
              {t("form_demo.SECTION_GROUP_DESC")}
            </p>
            <div className="grid gap-6 lg:grid-cols-2">
              <CheckboxGroup
                label={t("form_demo.FIELD_SKILLS")}
                value={state.skills}
                onChange={(value) =>
                  setState((prev) => ({ ...prev, skills: value }))
                }
                options={skillOptions}
              />
              <div className="space-y-6">
                <RadioGroup
                  label={t("form_demo.FIELD_PLAN")}
                  value={state.plan}
                  onChange={(value) =>
                    setState((prev) => ({ ...prev, plan: value }))
                  }
                  options={planOptions}
                />
                <RadioGroup
                  label={t("form_demo.FIELD_PLAN_HORIZONTAL")}
                  value={state.planHorizontal}
                  onChange={(value) =>
                    setState((prev) => ({ ...prev, planHorizontal: value }))
                  }
                  options={planOptions}
                  orientation="horizontal"
                />
              </div>
            </div>
          </section>

          <section className="rounded-3xl border bg-card p-6 shadow-sm">
            <h2 className="mb-1 text-lg font-semibold">
              {t("form_demo.SECTION_DATE")}
            </h2>
            <p className="mb-5 text-sm text-muted-foreground">
              {t("form_demo.SECTION_DATE_DESC")}
            </p>
            <div className="grid gap-5 md:grid-cols-2">
              <DatePicker
                label={t("form_demo.FIELD_DATE")}
                value={state.date}
                onChange={(value) =>
                  setState((prev) => ({ ...prev, date: value }))
                }
                placeholder={t("commons.PICK_DATE")}
              />
              <DateRangePicker
                label={t("form_demo.FIELD_DATE_RANGE")}
                value={state.dateRange}
                onChange={(value) =>
                  setState((prev) => ({ ...prev, dateRange: value }))
                }
                placeholder={t("commons.PICK_DATE_RANGE")}
              />
            </div>
          </section>

          <section className="rounded-3xl border bg-card p-6 shadow-sm">
            <h2 className="mb-1 text-lg font-semibold">
              {t("form_demo.SECTION_STATES")}
            </h2>
            <p className="mb-5 text-sm text-muted-foreground">
              {t("form_demo.SECTION_STATES_DESC")}
            </p>
            <div className="grid gap-5 md:grid-cols-2">
              <Input
                label={t("form_demo.FIELD_DISABLED")}
                value={t("form_demo.DISABLED_VALUE")}
                onChange={() => undefined}
                disabled
              />
              <Input
                label={t("form_demo.FIELD_ERROR")}
                value=""
                onChange={() => undefined}
                error={t("validation.EMAIL_REQUIRED")}
              />
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-3xl border bg-card p-5 shadow-sm">
            <h2 className="mb-1 text-base font-semibold">
              {t("form_demo.LIVE_STATE")}
            </h2>
            <p className="mb-4 text-xs text-muted-foreground">
              {t("form_demo.LIVE_STATE_DESC")}
            </p>
            <pre
              className={cn(
                "max-h-[calc(100vh-12rem)] overflow-auto rounded-2xl bg-muted/60 p-4",
                "text-xs leading-relaxed text-foreground/90",
              )}
            >
              {preview}
            </pre>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default FormDemoPage;
