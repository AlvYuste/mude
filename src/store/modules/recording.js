import uuid from 'uuid';
import * as R from 'ramda';
import { createAsyncReducer } from '../helpers/async/async.reducer';
import { createAsyncTypes } from '../helpers/async/async.types';
import { addTrackAction } from './project';
import {
  getMicrophoneData,
  askMicrophonePermission,
  getBlobDuration,
} from '../../services/audio';
import { createBasicReducer } from '../helpers/basic/basic.reducer';
import { selectTracksAction, getTimeSelected, selectTimeAction } from './ui';
import { playAction } from './playing';
import { addClipAction } from './track';
import { updateClipAction } from './clip';

export const RECORDING_KEY = 'RECORDING';
export const recordingLens = R.lensPath([RECORDING_KEY, 'isRecording']);
export const recorderLens = R.lensPath([RECORDING_KEY, 'recorder']);
export const recordingTrackLens = R.lensPath([RECORDING_KEY, 'trackId']);
export const recordingClipLens = R.lensPath([RECORDING_KEY, 'clipId']);
export const recordingStartedAtLens = R.lensPath([RECORDING_KEY, 'startedAt']);

export const getRecording = R.view(recordingLens);
export const getRecorder = R.view(recorderLens);
export const getRecordingTrack = R.view(recordingTrackLens);
export const getRecordingClip = R.view(recordingClipLens);
export const getRecordingStartedAt = R.view(recordingStartedAtLens);

/* RECORDING_RECORD */

export const RECORDING_DATA_KEY = 'RECORDING_DATA';
export const recordAction = () => async (dispatch, getState) => {
  const [req, succ, fail] = createAsyncTypes(RECORDING_KEY);
  const transactionId = uuid();
  const startedAt = getTimeSelected(getState());
  try {
    await askMicrophonePermission();
  } catch (error) {
    dispatch({ type: fail, error, transactionId });
    return;
  }
  addTrackAction(transactionId)(dispatch, getState);
  selectTracksAction(transactionId)(dispatch, getState);
  addClipAction({ id: transactionId })(dispatch, getState);
  const { recorder, stream } = await getMicrophoneData({
    onData: buffer => {
      if (getRecording(getState())) {
        dispatch({
          type: RECORDING_DATA_KEY,
          response: buffer,
          payload: { recorder, stream, startedAt },
          transactionId,
        });
      }
    },
    onFinish: async blob => {
      const endAt = startedAt + (await getBlobDuration(blob)) * 1000;
      updateClipAction({
        trackId: transactionId,
        id: transactionId,
        endAt,
        blob,
      })(dispatch, getState);
      selectTimeAction(endAt)(dispatch, getState);
      dispatch({
        type: succ,
        response: blob,
        payload: { recorder, stream },
        transactionId,
      });
    },
  });
  dispatch({
    type: req,
    transactionId,
    payload: { recorder, stream },
  });
  playAction()(dispatch, getState);
};
export const recordReducer = createAsyncReducer(RECORDING_KEY, {
  requestReducer: (state, action) => ({
    isRecording: true,
    recorder: action.payload.recorder,
    recordingTrack: action.transactionId,
    recordingClip: action.transactionId,
    recordingStartedAt: action.payload.startedAt,
  }),
  successReducer: (state, action) => {
    // TODO: MANAGE THE RESULTANT RECORDED DATA
    // console.log(action.response);
    return state;
  },
  errorReducer: state => ({
    ...state,
    isRecording: false,
    recorder: undefined,
    recordingTrack: undefined,
    recordingClip: undefined,
    recordingStartedAt: undefined,
  }),
});
export const recordDataReducer = createBasicReducer(
  RECORDING_DATA_KEY,
  (state, action) => {
    // TODO: MANAGE THE INCREMENTAL RECORDED DATA
    // console.log(action.response);
    return state;
  },
);

export const RECORDING_STOP_KEY = 'RECORDING_STOP';
export const stopRecordAction = () => async (dispatch, getState) => {
  if (!getRecording(getState())) {
    return;
  }
  getRecorder(getState()).stop();
  dispatch({
    type: RECORDING_STOP_KEY,
    transactionId: uuid(),
  });
};
export const stopRecordReducer = createBasicReducer(
  RECORDING_STOP_KEY,
  state => ({
    ...state,
    isRecording: false,
  }),
);
