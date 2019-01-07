import { createBasicReducer } from '../helpers/basic/basic.reducer';
import { createBasicAction } from '../helpers/basic/basic.action';
import { getTimeFromOffset } from '../../utils/utils';

export const UI_KEY = 'UI';

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
  { zoom: 1 },
);

const UI_SELECT_TIME_KEY = 'UI_SELECT_TIME';
export const selectTimeAction = createBasicAction(UI_SELECT_TIME_KEY);
export const selectTimeReducer = createBasicReducer(
  UI_SELECT_TIME_KEY,
  (state, action) => ({
    ...state,
    timeSelected: getTimeFromOffset(action.payload),
  }),
);

/* UI_SELECT_TRACK */
const UI_SELECT_TRACKS_KEY = 'UI_SELECT_TRACK';
export const selectTracksAction = createBasicAction(UI_SELECT_TRACKS_KEY);
export const selectTracksReducer = createBasicReducer(
  UI_SELECT_TRACKS_KEY,
  (state, action) => ({ ...state, selectedTracks: action.payload }),
);
