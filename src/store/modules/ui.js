import * as R from 'ramda';
import { createBasicReducer } from '../helpers/basic/basic.reducer';
import { createBasicAction } from '../helpers/basic/basic.action';
import { MIN_ZOOM, MAX_ZOOM } from '../../utils/variables';
import { shallowEqualArrays } from '../../utils/utils';

export const UI_KEY = 'UI';
export const uiLens = R.lensProp(UI_KEY);
export const zoomLens = R.lensPath([UI_KEY, 'zoom']);
export const collapsedLens = R.lensPath([UI_KEY, 'collapsed']);
export const timeSelectedLens = R.lensPath([UI_KEY, 'timeSelected']);
export const selectedTracksIdsLens = R.lensPath([UI_KEY, 'selectedTracks']);
export const selectedClipsIdsLens = R.lensPath([UI_KEY, 'selectedClips']);

export const getUi = R.view(uiLens);
export const getZoom = R.view(zoomLens);
export const getCollapsed = R.view(collapsedLens);
export const getTimeSelected = R.view(timeSelectedLens);
export const getSelectedTracks = R.view(selectedTracksIdsLens);
export const getSelectedClips = R.view(selectedClipsIdsLens);

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
export const setZoomAction = zoom => async dispatch => {
  if (zoom >= MIN_ZOOM && zoom <= MAX_ZOOM) {
    dispatch({
      type: UI_SET_ZOOM_KEY,
      payload: zoom,
    });
  }
};
export const setZoomReducer = createBasicReducer(
  UI_SET_ZOOM_KEY,
  (state, action) => ({ ...state, zoom: action.payload }),
  UI_INITIAL_STATE,
);
export const zoomInAction = () => (dispatch, getState) => {
  const currentZoom = R.view(zoomLens, getState());
  setZoomAction(currentZoom * 2)(dispatch, getState);
};
export const zoomOutAction = () => (dispatch, getState) => {
  const currentZoom = R.view(zoomLens, getState());
  setZoomAction(currentZoom / 2)(dispatch, getState);
};

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

/* UI_SELECT_TRACKS */
const UI_SELECT_TRACKS_KEY = 'UI_SELECT_TRACKS';
export const selectTracksAction = payload => (dispatch, getState) => {
  const tracksIds = Array.isArray(payload) ? payload : [payload];
  const selectedTracks = getSelectedTracks(getState());
  if (shallowEqualArrays(selectedTracks, tracksIds)) {
    return;
  }
  dispatch({ type: UI_SELECT_TRACKS_KEY, payload: tracksIds });
};
createBasicAction(UI_SELECT_TRACKS_KEY);
export const selectTracksReducer = createBasicReducer(
  UI_SELECT_TRACKS_KEY,
  (state, action) => ({ ...state, selectedTracks: action.payload }),
  UI_INITIAL_STATE,
);

/* UI_SELECT_CLIPS */
const UI_SELECT_CLIPS_KEY = 'UI_SELECT_CLIPS';
export const selectClipsAction = payload => (dispatch, getState) => {
  const clipsIds = Array.isArray(payload) ? payload : [payload];
  const selectedClips = getSelectedClips(getState());
  if (shallowEqualArrays(selectedClips, clipsIds)) {
    return;
  }
  dispatch({ type: UI_SELECT_CLIPS_KEY, payload: clipsIds });
};
createBasicAction(UI_SELECT_CLIPS_KEY);
export const selectClipsReducer = createBasicReducer(
  UI_SELECT_CLIPS_KEY,
  (state, action) => ({ ...state, selectedClips: action.payload }),
  UI_INITIAL_STATE,
);
