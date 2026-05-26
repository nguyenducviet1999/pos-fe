import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const useOpenDetailModal = (handleOpen: (seq?: any) => void, keyParam = "seq") => {
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const seq = searchParams.get(keyParam);
    if (seq !== null && seq !== undefined) {
      handleOpen(Number(seq));
      setTimeout(() => {
        searchParams.delete(keyParam);
        setSearchParams(searchParams);
      }, 100);
    }
  }, [searchParams]);
};
