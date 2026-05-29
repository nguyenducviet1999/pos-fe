import { useId, useMemo, useState } from "react";
import type { Dayjs } from "dayjs";
import { CalendarIcon } from "lucide-react";

import { FormField } from "@src/components/custom/form/form-field";
import type { FormControlBaseProps } from "@src/components/custom/form/types";
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

export type DatePickerProps = FormControlBaseProps & {
  value?: string | Date | Dayjs | null;
  onChange: (value: string | null) => void;
  placeholder?: React.ReactNode;
  format?: string;
  minDate?: string | Date | Dayjs;
  maxDate?: string | Date | Dayjs;
  align?: "start" | "center" | "end";
};

function DatePicker({
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
}: DatePickerProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [open, setOpen] = useState(false);

  const selectedDate = useMemo(() => parseDateValue(value), [value]);

  const displayValue = selectedDate ? dayjs(selectedDate).format(format) : null;

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
            mode="single"
            selected={selectedDate}
            disabled={disabledDays}
            onSelect={(date) => {
              onChange(formatDateValue(date, format));
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </FormField>
  );
}

export { DatePicker };
