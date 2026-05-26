import { quoteRequests } from "@src/requests/api/quote";
import { setTotalQuote } from "@src/stores/global/redux-slide";
import { useAppDispatch, useAppSelector } from "@src/stores/root-stores";

export const useGetTotalQuote = () => {
  const dispatch = useAppDispatch();

  const fetchTotalQuote = async () => {
    // You can dispatch an action to fetch total quotes here if needed
    try {
      const res = await quoteRequests.getTotal();
      dispatch(setTotalQuote(res));
    } catch (error) {
      console.error("Failed to fetch total quotes", error);
    }
  };
  const totalQuotePending = useAppSelector((state: any) => state.globalState.totalQuote["waiting"]);
  const totalQuoteCompleted = useAppSelector((state: any) => state.globalState.totalQuote["completed"]);
  return { totalQuotePending, totalQuoteCompleted, fetchTotalQuote };
};
