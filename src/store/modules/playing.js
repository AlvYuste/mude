import uuid from 'uuid';
import * as R from 'ramda';
import { timeSelectedLens, selectTimeAction } from './ui';
import { createBasicReducer } from '../helpers/basic/basic.reducer';
import { stopRecordAction } from './recording';

export const PLAYING_KEY = 'PLAYING';
export const playingLens = R.lensPath([PLAYING_KEY, 'playing']);
export const playingKeyLens = R.lensPath([PLAYING_KEY, 'playingKey']);
export const playingStartedAt = R.lensPath([PLAYING_KEY, 'playingStartedAt']);
export const playingStartedTs = R.lensPath([PLAYING_KEY, 'playingStartedTs']);

export const playAction = time => async (dispatch, getState) => {
  const transactionId = uuid();
  const startedTime = time || R.view(timeSelectedLens, getState());
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
    if (
      R.view(playingLens, getState()) &&
      R.view(playingKeyLens, getState()) === transactionId
    ) {
      selectTimeAction(startedTime + (ts - ts0))(dispatch);
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
export const stopReducer = createBasicReducer(UI_STOP_KEY, (state, action) => ({
  ...state,
  playing: false,
  playingStartedAt: undefined,
  playingStartedTs: undefined,
  timeSelected:
    state.playingStartedAt + (action.payload - state.playingStartedTs),
}));
