// function: handle change input with non-negative integer

// function: handle change input with non-negative integer
export const handleChangeInteger = (
  e: any,
  field: any,
  emptyValue: any = null,
) => {
  const value = e.target.value ?? "";
  if (/^-?[0-9]{0,20}$/.test(value)) {
    // Chỉ cho phép số nguyên dương
    const newValue = parseInt(value, 10);
    if (!isNaN(newValue) || value === "-") {
      field.onChange(value === "-" ? value : newValue);
    } else {
      field.onChange(emptyValue);
    }
  } else {
    field.onChange(field.value ?? "");
  }
};
// function: handle change input with non-negative integer
export const handleChangeNonNegativeInteger = (
  e: any,
  field: any,
  options?: {
    min?: number;
    max?: number;
    emptyValue?: any;
    isSetLimitValue?: boolean;
  },
) => {
  const value = e.target.value ?? "";
  if (/^[0-9]{0,20}$/.test(value)) {
    // Chỉ cho phép số nguyên dương
    const newValue = parseInt(value, 10);
    if (!isNaN(newValue)) {
      if (
        (options?.min === undefined || newValue >= options.min) &&
        (options?.max === undefined || newValue <= options.max)
      ) {
        // Kiểm tra giá trị có nằm trong khoảng min và max không
        field.onChange(newValue);
      } else {
        // Nếu không nằm trong khoảng, giữ nguyên giá trị cũ
        // field.onChange(field.value ?? "");
        if (
          options?.max &&
          newValue > options.max &&
          options?.isSetLimitValue
        ) {
          field.onChange(options?.max);
        } else if (
          options?.min &&
          newValue < options.min &&
          options?.isSetLimitValue
        ) {
          field.onChange(options?.min);
        } else {
          field.onChange(field.value ?? "");
        }
      }
    } else {
      field.onChange(options?.emptyValue ?? null);
    }
  } // if (field.value) {
  else {
    field.onChange(field.value ?? "");
  }
};

export const getValueNumber = (
  e: any,
  oldValue: any,
  options?: {
    min?: number;
    max?: number;
    decimalScale?: number;
    emptyValue?: any;
  },
) => {
  const decimalScale = options?.decimalScale ?? 2;
  const value = e.target.value ?? "";
  // if (/^-?[0-9]+(\.[0-9]*)?([eE][+-]?[0-9]+)?$/.test(value)) {
  const numberRegex = new RegExp(`^-?[0-9]+(\\.[0-9]{0,${decimalScale}})?$`);
  if (numberRegex.test(value)) {
    // Chỉ cho phép số nguyên dương
    // const newValue = parseFloat(value);
    const newValue = value;
    if (!isNaN(newValue)) {
      if (
        (options?.min === undefined || newValue >= options.min) &&
        (options?.max === undefined || newValue <= options.max)
      ) {
        // Kiểm tra giá trị có nằm trong khoảng min và max không
        // field.onChange(newValue);
        return newValue;
      }
      return oldValue ?? null;
    }
    return options?.emptyValue || null;
  }
  if (value === "" || value === "-") {
    return value || null;
  }
  return oldValue ?? null;
};

// hàm xử lý nhập số bao gồm số cho phép nhập các ký tự số, dấu trừ và E(Giống input tag type="number")
export const handleChangeNumber = (
  e: any,
  field: any,
  options?: {
    min?: number;
    max?: number;
    decimalScale?: number;
    emptyValue?: any;
  },
) => {
  // const decimalScale = options?.decimalScale ?? 2;
  // const value = e.target.value ?? "";
  // // if (/^-?[0-9]+(\.[0-9]*)?([eE][+-]?[0-9]+)?$/.test(value)) {
  // const numberRegex = new RegExp(`^-?[0-9]+(\\.[0-9]{0,${decimalScale}})?$`);
  // if (numberRegex.test(value)) {
  //   // Chỉ cho phép số nguyên dương
  //   // const newValue = parseFloat(value);
  //   const newValue = value;
  //   if (!isNaN(newValue)) {
  //     if ((options?.min === undefined || newValue >= options.min) && (options?.max === undefined || newValue <= options.max)) {
  //       // Kiểm tra giá trị có nằm trong khoảng min và max không
  //       field.onChange(newValue);
  //     } else {
  //       // Nếu không nằm trong khoảng, giữ nguyên giá trị cũ
  //       field.onChange(field.value ?? "");
  //       // if (options?.max && newValue > options.max && options?.isSetLimitValue) {
  //       //   field.onChange(options?.max);
  //       // } else if (options?.min && newValue < options.min && options?.isSetLimitValue) {
  //       //   field.onChange(options?.min);
  //       // } else {
  //       //   field.onChange(field.value ?? "");
  //       // }
  //     }
  //   } else {
  //     field.onChange(options?.emptyValue);
  //   }
  // } else {
  //   if (value === "" || value === "-") {
  //     field.onChange(value);
  //   } else {
  //     field.onChange(field.value ?? "");
  //   }
  // }
  const newValue = getValueNumber(e, field.value, options);
  field.onChange(newValue);
};

// function : handle change input with only a-z,0-9, space(without special character)
// hỗ trợ nhiều ngôn ngữ. nên có thể loại trừ các ký tự đặc biệt
export const handleChangeStringWithoutSpecialCharacter = (
  e: any,
  field: any,
) => {
  const value = e.target.value ?? "";
  const specialCharacters = /[!@#$%^&*(),.?":{}|/<>+_=[\]`~';\\-]/g;
  if (value.length > 0 && specialCharacters.test(value)) {
    // Nếu có ký tự đặc biệt, loại bỏ nó
    const newValue = value.replace(specialCharacters, "");
    field.onChange(newValue);
  }
  // Nếu không có ký tự đặc biệt, giữ nguyên giá trị
  else {
    field.onChange(value);
  }
};

export const handleFormatPhoneNumber = (event: any) => {
  const inputVal = event?.target?.value.replace(/ /g, "");
  let inputNumbersOnly = inputVal.replace(/\D/g, "");
  if (inputNumbersOnly.length > 16) {
    inputNumbersOnly = inputNumbersOnly.substr(0, 16);
  }
  const splits = inputNumbersOnly.match(/.{1,4}/g);
  let spacedNumber = "";
  if (splits) {
    spacedNumber = splits.join("-");
  }
  return spacedNumber;
};

export const handleGetNumberValue = (e: any) => {
  const stringValue = e.target.value ?? "";
  if (stringValue === "") return null;
  const newValue = !Number.isNaN(Number(stringValue))
    ? Number(stringValue)
    : stringValue;
  return newValue;
};
