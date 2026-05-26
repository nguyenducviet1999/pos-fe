/* LocalStorage */
export const saveLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key: string) => {
  return JSON.parse(localStorage.getItem(key) || "null");
};

/* SessionStorage */
const saveSessionStorage = (key: string, value: any) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

const getSessionStorage = (key: string) => {
  return JSON.parse(sessionStorage.getItem(key) || "null");
};

const removeSessionStorage = (name: string) => {
  sessionStorage.removeItem(name);
};

const resetSessionStorage = () => {
  sessionStorage.clear();
};

export const storeClient = {
  saveSessionStorage,
  getSessionStorage,
  removeSessionStorage,
  resetSessionStorage,
};
