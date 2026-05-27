const NUMBER_CURRENCY = /^[0-9]+(\,[0-9]{3})*$/;
const URL_LINK = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/;
const ONLY_CHARACTER = /^[a-zA-Z0-9\s]*$/;
const SPECIAL_SIMPLE_CHARACTER =
  /^[A-Za-z\d!@#$%^&*()\-+=_{}[\]|;:'",.<>/?]{8,}$/;

export const regExConstants = {
  NUMBER_CURRENCY,
  URL_LINK,
  ONLY_CHARACTER,
  SPECIAL_SIMPLE_CHARACTER,
};
