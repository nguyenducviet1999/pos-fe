import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";

export const useInvalidateQuery = (key: string) => {
  const queryClient = useQueryClient();
  return useCallback(() => queryClient.invalidateQueries({ queryKey: [key] }), [key, queryClient]);
};
