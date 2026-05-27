import { SELECTED_STORE } from "@src/constants/local-storage.constants";
import { IStore } from "@src/models/store";

import { getLocalStorage, saveLocalStorage } from "./local-storage";

export const getSelectedStore = (): IStore | null => {
  return getLocalStorage(SELECTED_STORE) as IStore | null;
};

export const setSelectedStore = (store: IStore): void => {
  saveLocalStorage(SELECTED_STORE, store);
};

export const clearSelectedStore = (): void => {
  localStorage.removeItem(SELECTED_STORE);
};
