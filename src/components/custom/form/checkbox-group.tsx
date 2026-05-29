import { useId } from "react";

import { FormField } from "@src/components/custom/form/form-field";
import type {
  FormControlBaseProps,
  FormOption,
} from "@src/components/custom/form/types";
import { optionValueToKey } from "@src/components/custom/form/utils";
import { Checkbox } from "@src/components/ui/checkbox";
import { Label } from "@src/components/ui/label";
import { cn } from "@src/lib/utils";

export type CheckboxGroupProps<TValue = string> = FormControlBaseProps & {
  value: TValue[];
  onChange: (value: TValue[]) => void;
  options: FormOption<TValue>[];
  orientation?: "horizontal" | "vertical";
};

function CheckboxGroup<TValue = string>({
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
  orientation = "vertical",
}: CheckboxGroupProps<TValue>) {
  const generatedId = useId();
  const groupId = id ?? generatedId;

  const toggleValue = (optionValue: TValue, checked: boolean) => {
    if (checked) {
      onChange([...value, optionValue]);
      return;
    }

    onChange(
      value.filter(
        (item) => optionValueToKey(item) !== optionValueToKey(optionValue),
      ),
    );
  };

  return (
    <FormField
      label={label}
      description={description}
      error={error}
      required={required}
      htmlFor={groupId}
      className={className}
      fieldClassName={fieldClassName}
      disabled={disabled}
    >
      <div
        id={groupId}
        role="group"
        aria-invalid={Boolean(error)}
        className={cn(
          "flex gap-3",
          orientation === "vertical" ? "flex-col" : "flex-row flex-wrap",
          fieldClassName,
        )}
      >
        {options.map((option) => {
          const optionId = `${groupId}-${optionValueToKey(option.value)}`;
          const isChecked = value.some(
            (item) => optionValueToKey(item) === optionValueToKey(option.value),
          );
          const isDisabled = disabled || option.disabled;

          return (
            <div
              key={optionId}
              className={cn(
                "group/checkbox-option flex items-start gap-3 rounded-2xl border border-transparent px-3 py-2.5 transition-colors",
                "hover:bg-muted/50 has-disabled:opacity-50",
              )}
            >
              <Checkbox
                id={optionId}
                checked={isChecked}
                disabled={isDisabled}
                aria-invalid={Boolean(error)}
                onCheckedChange={(checked) =>
                  toggleValue(option.value, checked === true)
                }
              />
              <div className="grid gap-1 leading-none">
                <Label
                  htmlFor={optionId}
                  className={cn(
                    "cursor-pointer font-normal",
                    isDisabled && "cursor-not-allowed opacity-60",
                  )}
                >
                  {option.label}
                </Label>
                {option.description ? (
                  <p className="text-xs text-muted-foreground">
                    {option.description}
                  </p>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </FormField>
  );
}

export { CheckboxGroup };
