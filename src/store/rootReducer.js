import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';

import * as account from './modules/account';
import * as errors from './modules/errors';
import * as project from './modules/project';

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
  [project.CURRENT_PROJECT_KEY]: reduceReducers(
    project.currentProjectReducer,
    project.updateProjectNameReducer,
    project.updateProjectTracksReducer,
    project.addTrackReducer,
    project.updateTrackReducer,
  ),
});
