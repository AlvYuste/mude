import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';

import * as ui from './modules/ui';
import * as toasts from './modules/toasts';
import * as account from './modules/account';
import * as project from './modules/project';
import * as track from './modules/track';

export const rootReducer = reduceReducers(
  account.signOutReducer,
  combineReducers({
    [ui.UI_KEY]: reduceReducers(
      ui.selectTracksReducer,
      ui.toggleCollapsedReducer,
    ),
    [toasts.TOASTS_KEY]: reduceReducers(
      toasts.toastOpenReducer,
      toasts.toastDismissReducer,
      toasts.errorsReducer,
    ),
    [account.CURRENT_ACCOUNT_KEY]: reduceReducers(
      account.currentAccountReducer,
      account.signInWithGoogleReducer,
      account.signInWithEmailReducer,
    ),
    [project.OWN_PROJECTS_KEY]: project.ownProjectsReducer,
    [project.CURRENT_PROJECT_KEY]: reduceReducers(
      project.openProjectReducer,
      project.newProjectReducer,
      project.saveProjectReducer,
      project.updateProjectNameReducer,
      project.updateProjectTracksReducer,
      project.addTrackReducer,
      project.deleteProjectReducer,

      track.updateTrackReducer,
    ),
  }),
);
