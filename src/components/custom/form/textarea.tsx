import { useId } from "react";

import { FormField } from "@src/components/custom/form/form-field";
import type { FormControlBaseProps } from "@src/components/custom/form/types";
import { Textarea as UiTextarea } from "@src/components/ui/textarea";

export type TextAreaProps = FormControlBaseProps &
  Omit<
    React.ComponentProps<typeof UiTextarea>,
    "value" | "onChange" | "disabled"
  > & {
    value: string;
    onChange: (value: string) => void;
  };

function TextArea({
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
}: TextAreaProps) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;

  return (
    <FormField
      label={label}
      description={description}
      error={error}
      required={required}
      htmlFor={textareaId}
      className={className}
      fieldClassName={fieldClassName}
      disabled={disabled}
    >
      <UiTextarea
        id={textareaId}
        value={value}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        onChange={(event) => onChange(event.target.value)}
        {...props}
      />
    </FormField>
  );
}

export { TextArea };
