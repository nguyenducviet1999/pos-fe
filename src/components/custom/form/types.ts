import type { ReactNode } from "react";

export type FormOption<TValue = unknown> = {
  label: ReactNode;
  value: TValue;
  disabled?: boolean;
  description?: ReactNode;
};

export type FormControlBaseProps = {
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  fieldClassName?: string;
  id?: string;
};

export type DateRangeValue = {
  from?: string | null;
  to?: string | null;
};
