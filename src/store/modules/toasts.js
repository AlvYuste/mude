import uuid from 'uuid';
import { Intent } from '@blueprintjs/core';
import { createBasicReducer } from '../helpers/basic/basic.reducer';
import { createBasicAction } from '../helpers/basic/basic.action';

export const TOASTS_KEY = 'TOASTS';
export const createToast = (message, rest) => ({
  message,
  key: uuid(),
  intent: Intent.PRIMARY,
  firedAt: new Date(),
  ...rest,
});
export const createErrorToast = (message, rest) =>
  createToast(message, {
    intent: Intent.DANGER,
    ...rest,
  });
export const createSuccessToast = (message, rest) =>
  createToast(message, {
    intent: Intent.SUCCESS,
    ...rest,
  });
export const createWarningToast = (message, rest) =>
  createToast(message, {
    intent: Intent.WARNING,
    ...rest,
  });

/* TOAST_OPEN */
export const TOAST_OPEN_KEY = 'TOAST_OPEN';
export const toastOpenAction = createBasicAction(TOAST_OPEN_KEY);
export const toastOpenReducer = createBasicReducer(
  TOAST_OPEN_KEY,
  (state, action) => [
    createToast(action.payload.message || action.payload, {
      intent: action.payload.intent || Intent.WARNING,
    }),
    ...state,
  ],
  [],
);
export const errorsReducer = (state = [], action) =>
  action.error && (!action.payload || action.payload.notifyErrors !== false)
    ? [
        createErrorToast(action.error.message || action.error, {
          actionType: action.type,
        }),
        ...state,
      ]
    : state;

/* TOAST_DISMISS */
export const TOAST_DISMISS_KEY = 'TOAST_DISMISS';
export const toastDismissAction = createBasicAction(TOAST_DISMISS_KEY);
export const toastDismissReducer = createBasicReducer(
  TOAST_DISMISS_KEY,
  (state, action) => state.filter(toast => toast.key !== action.payload),
);
