import uuid from 'uuid';
import * as R from 'ramda';
import { createAsyncReducer } from '../helpers/async/async.reducer';
import { createAsyncTypes } from '../helpers/async/async.types';
import {
  PROJECT_ADD_TRACK_KEY,
  currentProjectLens,
  tracksLens,
} from './project';
import {
  recordingLens,
  selectedTracksIdsLens,
  recordingTrackLens,
  timeSelectedLens,
} from './ui';
import { getMicrophoneData } from '../../services/audio';
import { askMicrophonePermission } from '../../utils/audio';

/* AUDIO_RECORD */
export const AUDIO_RECORD_KEY = 'AUDIO_RECORD';

export const audioRecordAction = () => async (dispatch, getState) => {
  const [req, succ, fail] = createAsyncTypes(AUDIO_RECORD_KEY);
  const transactionId = uuid();
  const currentProject = R.view(currentProjectLens, getState());
  const selectedTracksIds = R.view(selectedTracksIdsLens, getState());
  const tracks = R.view(tracksLens, currentProject);
  try {
    await askMicrophonePermission();
  } catch (error) {
    dispatch({ type: fail, error, transactionId });
    return;
  }
  let trackId;
  if (!tracks || !tracks.length) {
    dispatch({ type: PROJECT_ADD_TRACK_KEY, transactionId });
    trackId = transactionId;
  } else if (!selectedTracksIds || !selectedTracksIds.length) {
    trackId = tracks[0].id;
  } else {
    trackId = selectedTracksIds[0];
  }
  const { recorder, stream } = await getMicrophoneData({
    next: buffer =>
      dispatch({
        type: succ,
        response: buffer,
        payload: { trackId, recorder, stream },
        transactionId,
      }),
    // TODO: Add the finish record callback
    finish: blob => console.log(blob),
  });

  dispatch({
    type: req,
    transactionId,
    payload: { trackId, recorder, stream },
  });
};
export const audioRecordReducer = createAsyncReducer(AUDIO_RECORD_KEY, {
  requestReducer: (state, action) =>
    R.pipe(
      R.set(recordingLens, true),
      R.set(recordingTrackLens, action.payload.trackId),
      R.set(selectedTracksIdsLens, [action.payload.trackId]),
    )(state),
  successReducer: (state, action) =>
    R.pipe(
      R.over(
        timeSelectedLens,
        R.add(action.response.inputBuffer.duration * 1000),
      ),
    )(state),
  errorReducer: state =>
    R.pipe(
      R.set(recordingLens, false),
      R.set(recordingTrackLens, undefined),
    )(state),
});

export const AUDIO_RECORD_STOP_KEY = 'AUDIO_RECORD_STOP';
