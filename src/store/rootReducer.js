import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import undoable, { includeAction, groupByActionTypes } from 'redux-undo';

import * as ui from './modules/ui';
import * as tsts from './modules/toasts';
import * as acct from './modules/account';
import * as proj from './modules/project';
import * as trck from './modules/track';
import * as audio from './modules/audio';

export const rootReducer = reduceReducers(
  acct.signOutReducer,
  audio.recordReducer,
  audio.recordDataReducer,
  audio.stopRecordReducer,
  combineReducers({
    [ui.UI_KEY]: reduceReducers(
      ui.selectTracksReducer,
      ui.setZoomReducer,
      ui.toggleCollapsedReducer,
      ui.selectTimeReducer,
      ui.playReducer,
      ui.stopReducer,
    ),
    [tsts.TOASTS_KEY]: reduceReducers(
      tsts.toastOpenReducer,
      tsts.toastDismissReducer,
      tsts.errorsReducer,
    ),
    [acct.CURRENT_ACCOUNT_KEY]: reduceReducers(
      acct.currentAccountReducer,
      acct.signInWithGoogleReducer,
      acct.signInWithEmailReducer,
    ),
    [proj.OWN_PROJECTS_KEY]: proj.ownProjectsReducer,
    [proj.CURRENT_PROJECT_KEY]: undoable(
      reduceReducers(
        proj.openProjectReducer,
        proj.newProjectReducer,
        proj.saveProjectReducer,
        proj.setProjectNameReducer,
        proj.setProjectTracksReducer,
        proj.addTrackReducer,
        proj.deleteProjectReducer,

        trck.updateTrackReducer,
        trck.setTrackNameReducer,
        trck.setTrackVolumeReducer,
        trck.setTrackPanReducer,
        trck.deleteTrackReducer,
      ),
      {
        limit: 50,
        ignoreInitialState: true,
        filter: includeAction([
          ...trck.undoableActions,
          ...proj.undoableActions,
        ]),
        groupBy: groupByActionTypes([
          ...trck.groupableActions,
          ...proj.groupableActions,
        ]),
      },
    ),
  }),
);
