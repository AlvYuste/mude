import { ActionCreators } from 'redux-undo';

export const undoHistoryAction = () => dispatch =>
  dispatch(ActionCreators.undo());
export const redoHistoryAction = () => dispatch =>
  dispatch(ActionCreators.redo());
export const clearHistoryAction = () => dispatch =>
  dispatch(ActionCreators.clearHistory());
export const jumpHistoryAction = steps => dispatch =>
  dispatch(ActionCreators.jump(steps));
