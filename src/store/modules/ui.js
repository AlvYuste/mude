import * as R from 'ramda';
import { createBasicReducer } from '../helpers/basic/basic.reducer';
import { createBasicAction } from '../helpers/basic/basic.action';
import { MIN_ZOOM, MAX_ZOOM } from '../../utils/variables';
import { shallowEqualArrays } from '../../utils/utils';

export const UI_KEY = 'UI';
export const zoomLens = R.lensPath([UI_KEY, 'zoom']);
export const collapsedLens = R.lensPath([UI_KEY, 'collapsed']);
export const timeSelectedLens = R.lensPath([UI_KEY, 'timeSelected']);
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

/* UI_SELECT_TRACK */
const UI_SELECT_TRACKS_KEY = 'UI_SELECT_TRACK';
export const selectTracksAction = payload => (dispatch, getState) => {
  const selectedTracks = R.view(selectedTracksIdsLens, getState());
  if (shallowEqualArrays(selectedTracks, payload)) {
    return;
  }
  dispatch({ type: UI_SELECT_TRACKS_KEY, payload });
};
createBasicAction(UI_SELECT_TRACKS_KEY);
export const selectTracksReducer = createBasicReducer(
  UI_SELECT_TRACKS_KEY,
  (state, action) => ({ ...state, selectedTracks: action.payload }),
  UI_INITIAL_STATE,
);
