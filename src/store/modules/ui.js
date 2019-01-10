import * as R from 'ramda';
import uuid from 'uuid';
import { createBasicReducer } from '../helpers/basic/basic.reducer';
import { createBasicAction } from '../helpers/basic/basic.action';
import { stopRecordAction } from './audio';

export const UI_KEY = 'UI';
export const zoomLens = R.lensPath([UI_KEY, 'zoom']);
export const playingLens = R.lensPath([UI_KEY, 'playing']);
export const recordingLens = R.lensPath([UI_KEY, 'recording']);
export const recorderLens = R.lensPath([UI_KEY, 'recorder']);
export const collapsedLens = R.lensPath([UI_KEY, 'collapsed']);
export const timeSelectedLens = R.lensPath([UI_KEY, 'timeSelected']);
export const recordingTrackLens = R.lensPath([UI_KEY, 'recordingTrack']);
export const selectedTracksIdsLens = R.lensPath([UI_KEY, 'selectedTracks']);

const UI_INITIAL_STATE = {
  zoom: 1,
  collapsed: false,
  timeSelected: 0,
  selectedTracks: [],
};

const UI_TOGGLE_COLLAPSED_KEY = 'UI_TOGGLE_COLLAPSED';
export const toggleCollapsedAction = createBasicAction(UI_TOGGLE_COLLAPSED_KEY);
export const toggleCollapsedReducer = createBasicReducer(
  UI_TOGGLE_COLLAPSED_KEY,
  state => ({ ...state, collapsed: !state.collapsed }),
);
const UI_SET_ZOOM_KEY = 'UI_SET_ZOOM';
export const setZoomAction = createBasicAction(UI_SET_ZOOM_KEY);
export const setZoomReducer = createBasicReducer(
  UI_SET_ZOOM_KEY,
  (state, action) => ({ ...state, zoom: action.payload }),
  UI_INITIAL_STATE,
);

const UI_SELECT_TIME_KEY = 'UI_SELECT_TIME';
export const selectTimeAction = createBasicAction(UI_SELECT_TIME_KEY);
export const selectTimeReducer = createBasicReducer(
  UI_SELECT_TIME_KEY,
  (state, action) => ({
    ...state,
    timeSelected: action.payload,
  }),
  UI_INITIAL_STATE,
);

const UI_PLAY_KEY = 'UI_PLAY';
export const playAction = () => async (dispatch, getState) => {
  const transactionId = uuid();
  const startedTime = R.view(timeSelectedLens, getState());
  let ts0 = null;
  const step = ts => {
    if (!ts0) {
      ts0 = ts0 || ts;
      dispatch({
        type: UI_PLAY_KEY,
        transactionId,
        payload: { startedTime, startedTs: ts0 },
      });
    }
    dispatch({
      type: UI_SELECT_TIME_KEY,
      transactionId,
      payload: startedTime + (ts - ts0),
    });
    if (R.view(playingLens, getState())) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
};
export const playReducer = createBasicReducer(
  UI_PLAY_KEY,
  (state, action) => ({
    ...state,
    playing: true,
    playingStartedTime: action.payload.startedTime,
    playingStartedTs: action.payload.startedTs,
  }),
  UI_INITIAL_STATE,
);

const UI_STOP_KEY = 'UI_STOP';
export const stopAction = () => async (dispatch, getState) => {
  const transactionId = uuid();
  window.requestAnimationFrame(ts => {
    if (!R.view(playingLens, getState())) {
      return;
    }
    stopRecordAction()(dispatch, getState);
    dispatch({
      type: UI_STOP_KEY,
      transactionId,
      payload: ts,
    });
  });
};
export const stopReducer = createBasicReducer(
  UI_STOP_KEY,
  (state, action) => ({
    ...state,
    playing: false,
    playingStartedTime: undefined,
    playingStartedTs: undefined,
    timeSelected:
      state.playingStartedTime + (state.playingStartedTs - action.payload),
  }),
  UI_INITIAL_STATE,
);

/* UI_SELECT_TRACK */
const UI_SELECT_TRACKS_KEY = 'UI_SELECT_TRACK';
export const selectTracksAction = createBasicAction(UI_SELECT_TRACKS_KEY);
export const selectTracksReducer = createBasicReducer(
  UI_SELECT_TRACKS_KEY,
  (state, action) => ({ ...state, selectedTracks: action.payload }),
  UI_INITIAL_STATE,
);
