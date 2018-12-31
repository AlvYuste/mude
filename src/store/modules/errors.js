export const ERRORS_KEY = 'ERRORS';

export const errorsReducer = (state = [], action) => {
  const { type, error, payload, transactionId } = action;
  if (error && (!payload || payload.notifyErrors !== false)) {
    return [
      {
        key: transactionId,
        actionType: type,
        message: error.message || error,
        firedAt: new Date(),
      },
      ...state,
    ];
  }
  return state;
};

export const ERROR_DISMISS_KEY = 'ERROR_DISMISS';
export const dismissErrorAction = key => ({
  type: ERROR_DISMISS_KEY,
  payload: key,
});
export const errorDismissReducer = (state = [], action) => {
  const { type, payload } = action;
  if (type === ERROR_DISMISS_KEY) {
    return state.filter(error => error.key !== payload);
  }
  return state;
};
