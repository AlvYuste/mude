export const getRequestType = key => `${key}_REQUEST`;
export const getSuccessType = key => `${key}_SUCCESS`;
export const getErrorType = key => `${key}_ERROR`;

export const createAsyncTypes = key => [
  getRequestType(key),
  getSuccessType(key),
  getErrorType(key),
];
