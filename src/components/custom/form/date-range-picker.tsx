import { useId, useMemo, useState } from "react";
import type { Dayjs } from "dayjs";
import { CalendarIcon } from "lucide-react";
import type { DateRange } from "react-day-picker";

import { FormField } from "@src/components/custom/form/form-field";
import type {
  DateRangeValue,
  FormControlBaseProps,
} from "@src/components/custom/form/types";
import {
  formatDateValue,
  parseDateValue,
} from "@src/components/custom/form/utils";
import { Button } from "@src/components/ui/button";
import { Calendar } from "@src/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@src/components/ui/popover";
import { cn } from "@src/lib/utils";
import dayjs, { FORMAT_DATE } from "@src/utils/datetime";

export type DateRangePickerProps = FormControlBaseProps & {
  value?: DateRangeValue | null;
  onChange: (value: DateRangeValue) => void;
  placeholder?: React.ReactNode;
  format?: string;
  minDate?: string | Date | Dayjs;
  maxDate?: string | Date | Dayjs;
  align?: "start" | "center" | "end";
  numberOfMonths?: number;
};

function DateRangePicker({
  label,
  description,
  error,
  required,
  disabled,
  className,
  fieldClassName,
  id,
  value,
  onChange,
  placeholder,
  format = FORMAT_DATE.NORMAL,
  minDate,
  maxDate,
  align = "start",
  numberOfMonths = 2,
}: DateRangePickerProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [open, setOpen] = useState(false);

  const selectedRange = useMemo<DateRange | undefined>(() => {
    const from = parseDateValue(value?.from);
    const to = parseDateValue(value?.to);

    if (!from && !to) {
      return undefined;
    }

    return { from, to };
  }, [format, value?.from, value?.to]);

  const displayValue = useMemo(() => {
    const from = value?.from ? dayjs(value.from).format(format) : null;
    const to = value?.to ? dayjs(value.to).format(format) : null;

    if (from && to) {
      return `${from} - ${to}`;
    }

    if (from) {
      return from;
    }

    return null;
  }, [format, value?.from, value?.to]);

  const disabledDays = useMemo(() => {
    const matchers = [];

    if (minDate) {
      const min = parseDateValue(minDate);
      if (min) {
        matchers.push({ before: min });
      }
    }

    if (maxDate) {
      const max = parseDateValue(maxDate);
      if (max) {
        matchers.push({ after: max });
      }
    }

    return matchers.length ? matchers : undefined;
  }, [format, maxDate, minDate]);

  return (
    <FormField
      label={label}
      description={description}
      error={error}
      required={required}
      htmlFor={inputId}
      className={className}
      fieldClassName={fieldClassName}
      disabled={disabled}
    >
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={inputId}
            type="button"
            variant="outline"
            disabled={disabled}
            aria-invalid={Boolean(error)}
            className={cn(
              "h-9 w-full justify-start rounded-3xl border-transparent bg-input/50 px-3 font-normal hover:bg-input/60",
              !displayValue && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="size-4 shrink-0 opacity-70" />
            {displayValue ?? placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent align={align} className="w-auto p-0">
          <Calendar
            mode="range"
            numberOfMonths={numberOfMonths}
            selected={selectedRange}
            disabled={disabledDays}
            onSelect={(range) => {
              onChange({
                from: formatDateValue(range?.from, format),
                to: formatDateValue(range?.to, format),
              });
            }}
          />
        </PopoverContent>
      </Popover>
    </FormField>
  );
}

export { DateRangePicker };
