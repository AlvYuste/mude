import * as R from 'ramda';
import uuid from 'uuid';
import { Intent } from '@blueprintjs/core';
import { createBasicReducer } from '../helpers/basic/basic.reducer';
import { createBasicAction } from '../helpers/basic/basic.action';

export const TOASTS_KEY = 'TOASTS';
export const toastsLens = R.lensProp(TOASTS_KEY);
export const getToasts = R.view(toastsLens);

export const TOAST_OPEN_KEY = 'TOAST_OPEN';
export const createToast = props => ({
  key: uuid(),
  intent: Intent.PRIMARY,
  firedAt: new Date(),
  ...props,
});

export const createToastAction = props => ({
  type: TOAST_OPEN_KEY,
  payload: createToast(props),
});

/* TOAST_OPEN */
export const toastOpenAction = createBasicAction(TOAST_OPEN_KEY);
export const toastOpenReducer = createBasicReducer(
  TOAST_OPEN_KEY,
  (state, action) => [
    createToast({
      message: action.payload.message || action.payload,
      intent: action.payload.intent || Intent.WARNING,
    }),
    ...state,
  ],
  [],
);
export const errorsReducer = (state = [], action) =>
  action.error && (!action.payload || action.payload.notifyErrors !== false)
    ? [
        createToast({
          message: action.error.message || action.error,
          intent: Intent.DANGER,
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
