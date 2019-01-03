import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';

import * as ui from './modules/ui';
import * as errors from './modules/errors';
import * as account from './modules/account';
import * as project from './modules/project';

export const rootReducer = reduceReducers(
  account.signOutReducer,
  combineReducers({
    [ui.UI_KEY]: reduceReducers(ui.toggleCollapsedReducer),
    [errors.ERRORS_KEY]: reduceReducers(
      errors.errorsReducer,
      errors.errorDismissReducer,
    ),
    [account.CURRENT_ACCOUNT_KEY]: reduceReducers(
      account.currentAccountReducer,
      account.signInWithGoogleReducer,
      account.signInWithEmailReducer,
    ),
    [project.OWN_PROJECTS_KEY]: reduceReducers(project.ownProjectsReducer),
    [project.CURRENT_PROJECT_KEY]: reduceReducers(
      project.openProjectReducer,
      project.newProjectReducer,
      project.saveProjectReducer,
      project.updateProjectNameReducer,
      project.updateProjectTracksReducer,
      project.addTrackReducer,
      project.updateTrackReducer,
      project.selectTrackReducer,
    ),
  }),
);
