import { createAsyncReducer } from '../helpers/async/async.reducer';
import { createAsyncAction } from '../helpers/async/async.action';
import {
  getCurrentUser,
  signInWithGoogle,
  signOut,
  signInEmail,
  signUpEmail,
} from '../../services/auth';
import { createAsyncReducerTemplate } from '../helpers/async/async.reducer.template';

/* CURRENT_ACCOUNT */
export const CURRENT_ACCOUNT_KEY = 'CURRENT_ACCOUNT';
export const currentAccountReducer = createAsyncReducer(CURRENT_ACCOUNT_KEY);
export const currentAccountAction = createAsyncAction({
  key: CURRENT_ACCOUNT_KEY,
  asyncFunction: getCurrentUser,
});

/* SIGNUP_EMAIL */
export const SIGNUP_EMAIL_KEY = 'SIGNUP_EMAIL';
export const signUpWithEmailReducer = createAsyncReducerTemplate(
  SIGNUP_EMAIL_KEY,
  {
    request: s => ({ ...s, loading: true }),
    success: (s, a) => ({
      loading: false,
      data: a.response.user,
    }),
    error: (s, a) => ({ loading: false, error: a.error }),
  },
);
export const signUpWithEmailAction = createAsyncAction({
  key: SIGNUP_EMAIL_KEY,
  asyncFunction: signUpEmail,
});

/* SIGNIN_EMAIL */
export const SIGNIN_EMAIL_KEY = 'SIGNIN_EMAIL';
export const signInWithEmailReducer = createAsyncReducerTemplate(
  SIGNIN_EMAIL_KEY,
  {
    request: s => ({ ...s, loading: true }),
    success: (s, a) => ({
      loading: false,
      data: a.response.user,
    }),
    error: (s, a) => ({ loading: false, error: a.error }),
  },
);
export const signInWithEmailAction = createAsyncAction({
  key: SIGNIN_EMAIL_KEY,
  asyncFunction: signInEmail,
});

/* SIGNIN_GOOGLE */
export const SIGNIN_GOOGLE_KEY = 'SIGNIN_GOOGLE';
export const signInWithGoogleReducer = createAsyncReducerTemplate(
  SIGNIN_GOOGLE_KEY,
  {
    request: s => ({ ...s, loading: true }),
    success: (s, a) => ({
      loading: false,
      data: a.response.user,
    }),
    error: (s, a) => ({ loading: false, error: a.error }),
  },
);
export const signInWithGoogleAction = createAsyncAction({
  key: SIGNIN_GOOGLE_KEY,
  asyncFunction: signInWithGoogle,
});

/* SIGNOUT */
export const SIGNOUT_KEY = 'SIGNOUT';
export const signOutAction = createAsyncAction({
  key: SIGNOUT_KEY,
  asyncFunction: signOut,
});
export const signOutReducer = createAsyncReducerTemplate(SIGNOUT_KEY, {
  request: state => ({ ...state, loading: true }),
  success: () => ({ data: undefined, loading: false }),
  error: (state, action) => ({ loading: false, error: action.error }),
});
