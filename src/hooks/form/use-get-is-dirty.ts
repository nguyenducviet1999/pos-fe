import { UseFormReturn } from "react-hook-form";
export const useGetIsDirty = (
  methods: UseFormReturn<any, any, any>,
  exceptionFields: string[] = [],
) => {
  return (
    Object.keys(methods.formState.dirtyFields ?? {})?.filter(
      (s) => !exceptionFields.includes(s),
    )?.length > 0
  );
};
