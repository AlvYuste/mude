import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';

import * as account from './modules/account';
import * as errors from './modules/errors';

export const rootReducer = combineReducers({
  [errors.ERRORS_KEY]: reduceReducers(
    errors.errorsReducer,
    errors.errorDismissReducer,
  ),
  [account.CURRENT_ACCOUNT_KEY]: reduceReducers(
    account.currentAccountReducer,
    account.signInWithGoogleReducer,
    account.signInWithEmailReducer,
    account.signOutReducer,
  ),
});
