export const getRegexCheckLimitString = (limitRowLength: number, limitRows: number) => {
  return new RegExp(`^([^\n]{1,${limitRowLength}}\n){0,${limitRows - 1}}[^\n]{0,${limitRowLength}}$`);
};

// /^(|[0-9]{4})$/
export const getRegexStringNumberMaxLength = (length: number) => {
  return new RegExp(`^([0-9]{0,${length}})$`);
};

// validate email address
export const getRegexEmail = () => {
  return new RegExp(`^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$`);
};

// validate url address
export const getRegexUrl = () => {
  return new RegExp(`^(http|https)://[^ "]+$`);
};

export const getRegexCheckYoutubeLink = () => {
  return new RegExp("^(https?://)?(www.)?(youtube.com|youtu.be)/.+$");
};

export const getRegexCheckIsNumber = () => {
  return new RegExp("^[0-9]{0,6}$");
};
