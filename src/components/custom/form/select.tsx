import { useId } from "react";

import { FormField } from "@src/components/custom/form/form-field";
import type {
  FormControlBaseProps,
  FormOption,
} from "@src/components/custom/form/types";
import { optionValueToKey } from "@src/components/custom/form/utils";
import {
  Select as UiSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@src/components/ui/select";
import { cn } from "@src/lib/utils";

export type SelectProps<TValue = string> = FormControlBaseProps & {
  value?: TValue;
  onChange: (value: TValue) => void;
  options: FormOption<TValue>[];
  placeholder?: React.ReactNode;
  size?: "sm" | "default";
  contentClassName?: string;
};

function Select<TValue = string>({
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
  options,
  placeholder,
  size = "default",
  contentClassName,
}: SelectProps<TValue>) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const selectedKey =
    value === undefined || value === null ? undefined : optionValueToKey(value);

  const handleChange = (nextKey: string) => {
    const matchedOption = options.find(
      (option) => optionValueToKey(option.value) === nextKey,
    );

    if (matchedOption) {
      onChange(matchedOption.value);
    }
  };

  return (
    <FormField
      label={label}
      description={description}
      error={error}
      required={required}
      htmlFor={selectId}
      className={className}
      fieldClassName={fieldClassName}
      disabled={disabled}
    >
      <UiSelect
        value={selectedKey}
        disabled={disabled}
        onValueChange={handleChange}
      >
        <SelectTrigger
          id={selectId}
          size={size}
          aria-invalid={Boolean(error)}
          className="w-full"
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent
          className={cn(
            "w-[var(--radix-select-trigger-width)]",
            contentClassName,
          )}
        >
          {options.map((option) => (
            <SelectItem
              key={optionValueToKey(option.value)}
              value={optionValueToKey(option.value)}
              disabled={option.disabled}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </UiSelect>
    </FormField>
  );
}

export { Select };
