import { combineReducers } from 'redux';
import reduceReducers from 'reduce-reducers';
import undoable, { includeAction, groupByActionTypes } from 'redux-undo';

import * as ui from './modules/ui';
import * as tsts from './modules/toasts';
import * as acct from './modules/account';
import * as proj from './modules/project';
import * as trck from './modules/track';
import * as rec from './modules/recording';
import * as play from './modules/playing';

export const rootReducer = reduceReducers(
  acct.signOutReducer,
  rec.recordReducer,
  rec.recordDataReducer,
  combineReducers({
    [rec.RECORDING_KEY]: rec.stopRecordReducer,
    [play.PLAYING_KEY]: reduceReducers(play.playReducer, play.stopReducer),
    [ui.UI_KEY]: reduceReducers(
      ui.selectTracksReducer,
      ui.setZoomReducer,
      ui.toggleCollapsedReducer,
      ui.selectTimeReducer,
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
        trck.addClipReducer,
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
