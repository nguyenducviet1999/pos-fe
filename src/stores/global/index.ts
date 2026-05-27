import { IGlobalInfo } from "./data-type";
import globalReducer, { setCurrentSession, setTotalQuote } from "./redux-slide";

export {
  setCurrentSession,
  setTotalQuote as setTotalPendingQuotes,
  globalReducer,
};
export type { IGlobalInfo };
