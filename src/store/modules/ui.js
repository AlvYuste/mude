import { createBasicReducer } from '../helpers/basic/basic.reducer';
import { createBasicAction } from '../helpers/basic/basic.action';

export const UI_KEY = 'UI';

const UI_TOGGLE_COLLAPSED_KEY = 'UI_TOGGLE_COLLAPSED';
export const toggleCollapsedAction = createBasicAction(UI_TOGGLE_COLLAPSED_KEY);
export const toggleCollapsedReducer = createBasicReducer(
  UI_TOGGLE_COLLAPSED_KEY,
  state => ({ ...state, collapsed: !state.collapsed }),
  {},
);

/* UI_SELECT_TRACK */
const UI_SELECT_TRACKS_KEY = 'UI_SELECT_TRACK';
export const selectTracksReducer = createBasicReducer(
  UI_SELECT_TRACKS_KEY,
  (state, action) => ({ ...state, selectedTracks: action.payload }),
);
export const selectTracksAction = createBasicAction(UI_SELECT_TRACKS_KEY);
