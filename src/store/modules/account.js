import { createAsyncAction } from '../helpers/async/async.action';
import { createAsyncReducer } from '../helpers/async/async.reducer';
import {
  getCurrentUser,
  signInWithGoogle,
  signOut,
  signInEmail,
  signUpEmail,
} from '../../services/auth';

/* CURRENT_ACCOUNT */
export const CURRENT_ACCOUNT_KEY = 'CURRENT_ACCOUNT';
export const currentAccountReducer = createAsyncReducer(CURRENT_ACCOUNT_KEY);
export const currentAccountAction = createAsyncAction({
  key: CURRENT_ACCOUNT_KEY,
  asyncFunction: getCurrentUser,
});

/* SIGNUP_EMAIL */
export const SIGNUP_EMAIL_KEY = 'SIGNUP_EMAIL';
export const signUpWithEmailReducer = createAsyncReducer(SIGNUP_EMAIL_KEY, {
  successReducer: (s, a) => ({
    loading: false,
    data: a.response.user,
  }),
});
export const signUpWithEmailAction = createAsyncAction({
  key: SIGNUP_EMAIL_KEY,
  asyncFunction: signUpEmail,
});

/* SIGNIN_EMAIL */
export const SIGNIN_EMAIL_KEY = 'SIGNIN_EMAIL';
export const signInWithEmailReducer = createAsyncReducer(SIGNIN_EMAIL_KEY, {
  successReducer: (s, a) => ({
    loading: false,
    data: a.response.user,
  }),
});
export const signInWithEmailAction = createAsyncAction({
  key: SIGNIN_EMAIL_KEY,
  asyncFunction: signInEmail,
});

/* SIGNIN_GOOGLE */
export const SIGNIN_GOOGLE_KEY = 'SIGNIN_GOOGLE';
export const signInWithGoogleReducer = createAsyncReducer(SIGNIN_GOOGLE_KEY, {
  successReducer: (s, a) => ({
    loading: false,
    data: a.response.user,
  }),
});
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
export const signOutReducer = createAsyncReducer(SIGNOUT_KEY, {
  successReducer: () => ({ data: undefined, loading: false }),
});
