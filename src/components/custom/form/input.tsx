import { useId } from "react";

import { FormField } from "@src/components/custom/form/form-field";
import type { FormControlBaseProps } from "@src/components/custom/form/types";
import { Input as UiInput } from "@src/components/ui/input";

export type InputProps = FormControlBaseProps &
  Omit<
    React.ComponentProps<typeof UiInput>,
    "value" | "onChange" | "disabled"
  > & {
    value: string;
    onChange: (value: string) => void;
  };

function Input({
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
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

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
      <UiInput
        id={inputId}
        value={value}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        onChange={(event) => onChange(event.target.value)}
        {...props}
      />
    </FormField>
  );
}

export { Input };
