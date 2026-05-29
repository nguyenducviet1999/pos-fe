import { useId } from "react";

import { FormField } from "@src/components/custom/form/form-field";
import type {
  FormControlBaseProps,
  FormOption,
} from "@src/components/custom/form/types";
import { optionValueToKey } from "@src/components/custom/form/utils";
import { Label } from "@src/components/ui/label";
import {
  RadioGroup as UiRadioGroup,
  RadioGroupItem,
} from "@src/components/ui/radio-group";
import { cn } from "@src/lib/utils";

export type RadioGroupProps<TValue = string> = FormControlBaseProps & {
  value?: TValue;
  onChange: (value: TValue) => void;
  options: FormOption<TValue>[];
  orientation?: "horizontal" | "vertical";
};

function RadioGroup<TValue = string>({
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
}: RadioGroupProps<TValue>) {
  const generatedId = useId();
  const groupId = id ?? generatedId;
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
      htmlFor={groupId}
      className={className}
      fieldClassName={fieldClassName}
      disabled={disabled}
    >
      <UiRadioGroup
        id={groupId}
        value={selectedKey}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        onValueChange={handleChange}
        className={cn(
          orientation === "horizontal" && "flex flex-row flex-wrap gap-2",
          fieldClassName,
        )}
      >
        {options.map((option) => {
          const optionId = `${groupId}-${optionValueToKey(option.value)}`;
          const isDisabled = disabled || option.disabled;

          return (
            <div
              key={optionId}
              className={cn(
                "group/radio-option flex items-start gap-3 rounded-2xl border border-transparent px-3 py-2.5 transition-colors",
                "hover:bg-muted/50 has-disabled:opacity-50",
              )}
            >
              <RadioGroupItem
                id={optionId}
                value={optionValueToKey(option.value)}
                disabled={isDisabled}
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
      </UiRadioGroup>
    </FormField>
  );
}

export { RadioGroup };
