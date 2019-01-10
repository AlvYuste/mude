import uuid from 'uuid';
import * as R from 'ramda';
import { createAsyncReducer } from '../helpers/async/async.reducer';
import { createAsyncTypes } from '../helpers/async/async.types';
import { addTrackAction } from './project';
import {
  recordingLens,
  selectedTracksIdsLens,
  recordingTrackLens,
  playAction,
  recorderLens,
} from './ui';
import { getMicrophoneData } from '../../services/audio';
import { askMicrophonePermission } from '../../utils/audio';
import { createBasicReducer } from '../helpers/basic/basic.reducer';

/* AUDIO_RECORD */
export const AUDIO_RECORD_KEY = 'AUDIO_RECORD';
export const AUDIO_RECORD_DATA_KEY = 'AUDIO_RECORD_DATA';
export const recordAction = () => async (dispatch, getState) => {
  const [req, succ, fail] = createAsyncTypes(AUDIO_RECORD_KEY);
  const transactionId = uuid();
  try {
    await askMicrophonePermission();
  } catch (error) {
    dispatch({ type: fail, error, transactionId });
    return;
  }
  addTrackAction(transactionId)(dispatch);
  const { recorder, stream } = await getMicrophoneData({
    onData: buffer =>
      dispatch({
        type: AUDIO_RECORD_DATA_KEY,
        response: buffer,
        payload: { trackId: transactionId, recorder, stream },
        transactionId,
      }),
    onFinish: blob =>
      dispatch({
        type: succ,
        response: blob,
        payload: { trackId: transactionId, recorder, stream },
        transactionId,
      }),
  });
  dispatch({
    type: req,
    transactionId,
    payload: { trackId: transactionId, recorder, stream },
  });
  playAction()(dispatch, getState);
};
export const recordReducer = createAsyncReducer(AUDIO_RECORD_KEY, {
  requestReducer: (state, action) =>
    R.pipe(
      R.set(recordingLens, true),
      R.set(recorderLens, action.payload.recorder),
      R.set(recordingTrackLens, action.payload.trackId),
      R.set(selectedTracksIdsLens, [action.payload.trackId]),
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
  AUDIO_RECORD_DATA_KEY,
  (state, action) => {
    // TODO: MANAGE THE INCREMENTAL RECORDED DATA
    console.log(action.response);
    return state;
  },
);

export const AUDIO_RECORD_STOP_KEY = 'AUDIO_RECORD_STOP';
export const stopRecordAction = () => async (dispatch, getState) => {
  const transactionId = uuid();
  if (!R.view(recordingLens, getState())) {
    return;
  }
  const recorder = R.view(recorderLens, getState());
  recorder.stop();
  dispatch({
    type: AUDIO_RECORD_STOP_KEY,
    transactionId,
  });
};
export const stopRecordReducer = createBasicReducer(
  AUDIO_RECORD_STOP_KEY,
  state => R.set(recordingLens, false, state),
);
