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
      if (!getRecording(getState())) {
        return;
      }
      updateClipAction({
        trackId: transactionId,
        id: transactionId,
        buffer,
      })(dispatch, getState);
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
        payload: { recorder, stream, startedAt },
        transactionId,
      });
    },
  });
  dispatch({
    type: req,
    transactionId,
    payload: { recorder, stream, startedAt },
  });
  playAction()(dispatch, getState);
};
export const stopRecordAction = () => async (dispatch, getState) => {
  if (!getRecording(getState())) {
    return;
  }
  getRecorder(getState()).stop();
};
export const recordReducer = createAsyncReducer(RECORDING_KEY, {
  requestReducer: (state, action) => ({
    isRecording: true,
    recorder: action.payload.recorder,
    recordingTrack: action.transactionId,
    recordingClip: action.transactionId,
    recordingStartedAt: action.payload.startedAt,
  }),
  successReducer: () => ({
    isRecording: false,
    recorder: undefined,
    recordingTrack: undefined,
    recordingClip: undefined,
    recordingStartedAt: undefined,
  }),
  errorReducer: () => ({
    isRecording: false,
    recorder: undefined,
    recordingTrack: undefined,
    recordingClip: undefined,
    recordingStartedAt: undefined,
  }),
});
