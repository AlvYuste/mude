import uuid from 'uuid';
import * as R from 'ramda';
import { createAsyncReducer } from '../helpers/async/async.reducer';
import { createAsyncTypes } from '../helpers/async/async.types';
import { addTrackAction } from './project';
import { selectedTracksIdsLens, timeSelectedLens } from './ui';
import {
  getMicrophoneData,
  askMicrophonePermission,
} from '../../services/audio';
import { createBasicReducer } from '../helpers/basic/basic.reducer';
import { playAction } from './playing';
import { addClipAction } from './track';

export const RECORDING_KEY = 'RECORDING';
export const recordingLens = R.lensPath([RECORDING_KEY, 'isRecording']);
export const recorderLens = R.lensPath([RECORDING_KEY, 'recorder']);
export const recordingTrackLens = R.lensPath([RECORDING_KEY, 'trackId']);
export const recordingClipLens = R.lensPath([RECORDING_KEY, 'clipId']);
export const recordingStartedAtLens = R.lensPath([RECORDING_KEY, 'startedAt']);
/* RECORDING_RECORD */

export const RECORDING_DATA_KEY = 'RECORDING_DATA';
export const recordAction = () => async (dispatch, getState) => {
  const [req, succ, fail] = createAsyncTypes(RECORDING_KEY);
  const transactionId = uuid();
  const startedTime = R.view(timeSelectedLens, getState());
  try {
    await askMicrophonePermission();
  } catch (error) {
    dispatch({ type: fail, error, transactionId });
    return;
  }
  addTrackAction(transactionId)(dispatch);

  // TODO: The end time is a draft
  addClipAction({
    trackId: transactionId,
    clipId: transactionId,
    startAt: startedTime,
    endAt: startedTime + 1000,
  })(dispatch);
  const { recorder, stream } = await getMicrophoneData({
    onData: buffer => {
      if (R.view(recordingLens, getState())) {
        dispatch({
          type: RECORDING_DATA_KEY,
          response: buffer,
          payload: { recorder, stream },
          transactionId,
        });
      }
    },
    onFinish: blob =>
      dispatch({
        type: succ,
        response: blob,
        payload: { recorder, stream },
        transactionId,
      }),
  });
  dispatch({
    type: req,
    transactionId,
    payload: { recorder, stream },
  });
  playAction()(dispatch, getState);
};
export const recordReducer = createAsyncReducer(RECORDING_KEY, {
  requestReducer: (state, action) =>
    R.pipe(
      R.set(recordingLens, true),
      R.set(recorderLens, action.payload.recorder),
      R.set(recordingTrackLens, action.transactionId),
      R.set(recordingClipLens, action.transactionId),
      R.set(recordingStartedAtLens, R.view(timeSelectedLens, state)),
      R.set(selectedTracksIdsLens, [action.transactionId]),
    )(state),
  successReducer: (state, action) => {
    // TODO: MANAGE THE RESULTANT RECORDED DATA
    console.log(action.response);
    return state;
  },
  errorReducer: state =>
    R.pipe(
      R.set(recordingLens, false),
      R.set(recordingTrackLens, undefined),
    )(state),
});
export const recordDataReducer = createBasicReducer(
  RECORDING_DATA_KEY,
  (state, action) => {
    // TODO: MANAGE THE INCREMENTAL RECORDED DATA
    console.log(action.response);
    return state;
  },
);

export const RECORDING_STOP_KEY = 'RECORDING_STOP';
export const stopRecordAction = () => async (dispatch, getState) => {
  if (!R.view(recordingLens, getState())) {
    return;
  }
  const transactionId = uuid();
  const recorder = R.view(recorderLens, getState());
  recorder.stop();
  dispatch({
    type: RECORDING_STOP_KEY,
    transactionId,
  });
};
export const stopRecordReducer = createBasicReducer(RECORDING_STOP_KEY, () => ({
  recording: false,
}));
