import { useAppSelector } from "@src/stores";

export const useGetCurrentSession = () => {
  const currentSession = useAppSelector((state: any) => state.globalState.currentSession);
  return currentSession;
};
