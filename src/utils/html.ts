export const encodeBase64 = (str: string) => {
  return btoa(unescape(encodeURIComponent(str)));
};

function isValidBase64(str: string) {
  try {
    return btoa(atob(str)) === str;
  } catch (err) {
    return false;
  }
}

export const decodeBase64 = (str: string) => {
  if (!isValidBase64(str)) {
    return str;
  }
  return decodeURIComponent(escape(atob(str)));
};
