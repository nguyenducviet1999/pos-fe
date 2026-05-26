import { ArrayPath, FieldValues, Resolver, useFieldArray, UseFieldArrayReturn, useForm, UseFormProps, UseFormReturn } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export type FormOptions<T extends FieldValues> = {
  fieldArray?: ArrayPath<T>;
} & UseFormProps<T>;

type ReturnType<T extends FieldValues> = {
  form: UseFormReturn<T>;
  formArray: UseFieldArrayReturn<T, ArrayPath<T>, "id">;
};

export function useCustomForm<T extends FieldValues>(schema?: yup.ObjectSchema<T>, options?: FormOptions<T>): ReturnType<T> {
  const resolver = (schema ? yupResolver(schema) : undefined) as unknown as Resolver<T>;
  const form = useForm<T>({
    resolver,
    mode: options?.mode || "all",
    reValidateMode: options?.reValidateMode || "onSubmit",
    ...options,
  });

  const formArray = useFieldArray<T>({
    name: options?.fieldArray as ArrayPath<T>,
    control: form.control,
  });

  return {
    form,
    formArray,
  };
}
