import uuid from 'uuid';
import * as R from 'ramda';
import { selectTimeAction, getTimeSelected } from './ui';
import { createBasicReducer } from '../helpers/basic/basic.reducer';
import { stopRecordAction } from './recording';

export const PLAYING_KEY = 'PLAYING';
export const playingLens = R.lensPath([PLAYING_KEY, 'playing']);
export const playingKeyLens = R.lensPath([PLAYING_KEY, 'playingKey']);
export const playingStartedAtLens = R.lensPath([
  PLAYING_KEY,
  'playingStartedAt',
]);
export const playingStartedTsLens = R.lensPath([
  PLAYING_KEY,
  'playingStartedTs',
]);

export const getPlaying = R.view(playingLens);
export const getPlayingKey = R.view(playingKeyLens);
export const getPlayingStartedAt = R.view(playingStartedAtLens);
export const getPlayingStartedTs = R.view(playingStartedTsLens);
/**
 * PLAY
 */
export const playAction = time => async (dispatch, getState) => {
  const transactionId = uuid();
  const startedTime = time || getTimeSelected(getState());
  let ts0 = null;
  const step = ts => {
    if (!ts0) {
      ts0 = ts0 || ts;
      dispatch({
        type: PLAYING_KEY,
        transactionId,
        payload: { startedTime, startedTs: ts0 },
      });
    }
    const inc = ts - ts0;
    if (getPlaying(getState()) && getPlayingKey(getState()) === transactionId) {
      selectTimeAction(startedTime + inc)(dispatch);
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
};
export const playReducer = createBasicReducer(PLAYING_KEY, (state, action) => ({
  ...state,
  playing: true,
  playingStartedAt: action.payload.startedTime,
  playingStartedTs: action.payload.startedTs,
  playingKey: action.transactionId,
}));

/**
 * STOP
 */
const UI_STOP_KEY = 'UI_STOP';
export const stopAction = () => async (dispatch, getState) => {
  const transactionId = uuid();
  window.requestAnimationFrame(ts => {
    if (!getPlaying(getState())) {
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
export const stopReducer = createBasicReducer(UI_STOP_KEY, (state, action) => ({
  ...state,
  playing: false,
  playingStartedAt: undefined,
  playingStartedTs: undefined,
  timeSelected:
    state.playingStartedAt + (action.payload - state.playingStartedTs),
}));
