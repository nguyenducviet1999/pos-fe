import { useId, useMemo, useState } from "react";
import { CheckIcon, ChevronsUpDownIcon, XIcon } from "lucide-react";

import { FormField } from "@src/components/custom/form/form-field";
import type {
  FormControlBaseProps,
  FormOption,
} from "@src/components/custom/form/types";
import { optionValueToKey } from "@src/components/custom/form/utils";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@src/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@src/components/ui/popover";
import { cn } from "@src/lib/utils";

export type MultiSelectProps<TValue = string> = FormControlBaseProps & {
  value: TValue[];
  onChange: (value: TValue[]) => void;
  options: FormOption<TValue>[];
  placeholder?: React.ReactNode;
  searchPlaceholder?: React.ReactNode;
  emptyText?: React.ReactNode;
  maxVisibleTags?: number;
  align?: "start" | "center" | "end";
};

function MultiSelect<TValue = string>({
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
  searchPlaceholder,
  emptyText,
  maxVisibleTags = 2,
  align = "start",
}: MultiSelectProps<TValue>) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [open, setOpen] = useState(false);

  const selectedOptions = useMemo(
    () =>
      options.filter((option) =>
        value.some(
          (item) => optionValueToKey(item) === optionValueToKey(option.value),
        ),
      ),
    [options, value],
  );

  const toggleValue = (optionValue: TValue) => {
    const exists = value.some(
      (item) => optionValueToKey(item) === optionValueToKey(optionValue),
    );

    if (exists) {
      onChange(
        value.filter(
          (item) => optionValueToKey(item) !== optionValueToKey(optionValue),
        ),
      );
      return;
    }

    onChange([...value, optionValue]);
  };

  const removeValue = (optionValue: TValue) => {
    onChange(
      value.filter(
        (item) => optionValueToKey(item) !== optionValueToKey(optionValue),
      ),
    );
  };

  const visibleTags = selectedOptions.slice(0, maxVisibleTags);
  const hiddenCount = Math.max(selectedOptions.length - maxVisibleTags, 0);

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
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            aria-invalid={Boolean(error)}
            className={cn(
              "h-auto min-h-9 w-full justify-between rounded-3xl border-transparent bg-input/50 px-3 py-1.5 font-normal hover:bg-input/60",
              !selectedOptions.length && "text-muted-foreground",
            )}
          >
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
              {selectedOptions.length ? (
                <>
                  {visibleTags.map((option) => (
                    <Badge
                      key={optionValueToKey(option.value)}
                      variant="secondary"
                      className="max-w-full gap-1 pr-1"
                    >
                      <span className="truncate">{option.label}</span>
                      <button
                        type="button"
                        className="rounded-full p-0.5 hover:bg-foreground/10"
                        disabled={disabled}
                        onClick={(event) => {
                          event.stopPropagation();
                          removeValue(option.value);
                        }}
                      >
                        <XIcon className="size-3" />
                      </button>
                    </Badge>
                  ))}
                  {hiddenCount > 0 ? (
                    <Badge variant="outline">+{hiddenCount}</Badge>
                  ) : null}
                </>
              ) : (
                placeholder
              )}
            </div>
            <ChevronsUpDownIcon className="size-4 shrink-0 opacity-60" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align={align}
          className="w-[var(--radix-popover-trigger-width)] p-0"
        >
          <Command>
            <CommandInput
              placeholder={searchPlaceholder as string | undefined}
            />
            <CommandList>
              <CommandEmpty>{emptyText}</CommandEmpty>
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = value.some(
                    (item) =>
                      optionValueToKey(item) === optionValueToKey(option.value),
                  );

                  return (
                    <CommandItem
                      key={optionValueToKey(option.value)}
                      value={optionValueToKey(option.value)}
                      disabled={option.disabled}
                      data-checked={isSelected}
                      onSelect={() => toggleValue(option.value)}
                    >
                      <span
                        className={cn(
                          "flex size-4 items-center justify-center rounded-[5px] border border-border",
                          isSelected &&
                            "border-primary bg-primary text-primary-foreground",
                        )}
                      >
                        {isSelected ? <CheckIcon className="size-3" /> : null}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="truncate">{option.label}</div>
                        {option.description ? (
                          <div className="truncate text-xs text-muted-foreground">
                            {option.description}
                          </div>
                        ) : null}
                      </div>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </FormField>
  );
}

export { MultiSelect };
