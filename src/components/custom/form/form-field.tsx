import type { ReactNode } from "react";

import { Label } from "@src/components/ui/label";
import { cn } from "@src/lib/utils";

export type FormFieldProps = {
  label?: ReactNode;
  description?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  htmlFor?: string;
  className?: string;
  fieldClassName?: string;
  disabled?: boolean;
  children: ReactNode;
};

function FormField({
  label,
  description,
  error,
  required,
  htmlFor,
  className,
  fieldClassName,
  disabled,
  children,
}: FormFieldProps) {
  return (
    <div
      className={cn("group/field space-y-2", className)}
      data-disabled={disabled ? true : undefined}
    >
      {label ? (
        <Label
          htmlFor={htmlFor}
          className={cn(
            "text-foreground/90",
            disabled && "cursor-not-allowed opacity-60",
          )}
        >
          {label}
          {required ? (
            <span className="text-destructive" aria-hidden>
              *
            </span>
          ) : null}
        </Label>
      ) : null}

      <div className={cn("relative", fieldClassName)}>{children}</div>

      {description && !error ? (
        <p className="text-xs text-muted-foreground">{description}</p>
      ) : null}

      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

export { FormField };
