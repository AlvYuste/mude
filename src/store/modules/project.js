import * as R from 'ramda';
import uuid from 'uuid';
import { navigate } from '@reach/router';
import { lensById } from '../../utils/fp';
import { createAsyncReducer } from '../helpers/async/async.reducer';
import { createBasicReducer } from '../helpers/basic/basic.reducer';
import { createBasicAction } from '../helpers/basic/basic.action';
import {
  saveProject,
  getOwnProjects,
  getProjectDetail,
} from '../../services/project';
import { createAsyncTypes } from '../helpers/async/async.types';

const dataLense = prop => R.lensPath(['data', prop]);
const trackLens = id =>
  R.compose(
    dataLense('tracks'),
    lensById(id),
  );

export const CURRENT_PROJECT_KEY = 'CURRENT_PROJECT';

/* OPEN PROJECT */
export const OPEN_PROJECT_KEY = 'OPEN_PROJECT';
export const openProjectReducer = createAsyncReducer(OPEN_PROJECT_KEY);
export const openProjectAction = payload => dispatch => {
  const [req, succ, fail] = createAsyncTypes(OPEN_PROJECT_KEY);
  const transactionId = uuid();
  dispatch({ type: req });
  getProjectDetail(payload, asyncResponse =>
    dispatch({
      type: succ,
      response: asyncResponse,
    }),
  ).catch(error =>
    dispatch({
      type: fail,
      transactionId,
      error: error.message,
    }),
  );
};

/* OWN_PROJECTS */
export const OWN_PROJECTS_KEY = 'OWN_PROJECTS';
export const ownProjectsReducer = createAsyncReducer(OWN_PROJECTS_KEY);
export const ownProjectsAction = () => dispatch => {
  const [req, succ, fail] = createAsyncTypes(OWN_PROJECTS_KEY);
  const transactionId = uuid();
  dispatch({ type: req, transactionId });
  getOwnProjects(asyncResponse =>
    dispatch({
      type: succ,
      response: asyncResponse,
    }),
  ).catch(error =>
    dispatch({
      type: fail,
      transactionId,
      error: error.message,
    }),
  );
};

/* CURRENT PROJECT SAVE */
export const PROJECT_SAVE_KEY = 'PROJECT_SAVE';
export const saveProjectAction = () => (dispatch, getState) => {
  const [req, succ, fail] = createAsyncTypes(PROJECT_SAVE_KEY);
  const transactionId = uuid();
  const {
    [CURRENT_PROJECT_KEY]: { data: currentProject },
  } = getState();
  dispatch({ type: req, transactionId });
  saveProject(currentProject).then(
    response => dispatch({ response, type: succ, transactionId }),
    error =>
      dispatch({
        type: fail,
        error: error.message,
        transactionId,
      }),
  );
};
export const saveProjectReducer = createAsyncReducer(PROJECT_SAVE_KEY);

/* PROJECT_NEW */
export const PROJECT_NEW_KEY = 'PROJECT_NEW';
export const newProjectReducer = createBasicReducer(
  PROJECT_NEW_KEY,
  () => ({}),
);
export const newProjectAction = createBasicAction(PROJECT_NEW_KEY, () =>
  navigate('/'),
);

/* PROJECT_UPDATE_NAME */
export const PROJECT_UPDATE_NAME_KEY = 'PROJECT_UPDATE_NAME';
export const updateProjectNameReducer = createBasicReducer(
  PROJECT_UPDATE_NAME_KEY,
  (state, action) => R.set(dataLense('name'), action.payload, state),
);
export const updateProjectNameAction = createBasicAction(
  PROJECT_UPDATE_NAME_KEY,
);

/* PROJECT_UPDATE_TRACKS */
export const PROJECT_UPDATE_TRACKS_KEY = 'PROJECT_UPDATE_TRACKS';
export const updateProjectTracksReducer = createBasicReducer(
  PROJECT_UPDATE_TRACKS_KEY,
  (state, action) => R.set(dataLense('tracks'), action.payload, state),
);
export const updateProjectTracksAction = createBasicAction(
  PROJECT_UPDATE_TRACKS_KEY,
);

/* PROJECT_SELECT_TRACK */
export const PROJECT_SELECT_TRACK_KEY = 'PROJECT_SELECT_TRACK';
export const selectTrackReducer = createBasicReducer(
  PROJECT_SELECT_TRACK_KEY,
  (state, action) =>
    R.set(dataLense('selectedTrackId'), action.payload.id, state),
);
export const selectTrackAction = createBasicAction(PROJECT_SELECT_TRACK_KEY);

/* PROJECT_ADD_TRACK */
export const PROJECT_ADD_TRACK_KEY = 'PROJECT_ADD_TRACK';
export const addTrackReducer = createBasicReducer(
  PROJECT_ADD_TRACK_KEY,
  (state, action) =>
    R.over(
      dataLense('tracks'),
      R.prepend({ id: action.transactionId, volume: 5 }),
      state,
    ),
);
export const addTrackAction = createBasicAction(PROJECT_ADD_TRACK_KEY);

/* PROJECT_UPDATE_TRACK */
export const PROJECT_UPDATE_TRACK_KEY = 'PROJECT_UPDATE_TRACK';
export const updateTrackReducer = createBasicReducer(
  PROJECT_UPDATE_TRACK_KEY,
  (state, action) =>
    R.over(
      trackLens(action.payload.id),
      R.mergeDeepLeft(action.payload),
      state,
    ),
);
export const updateTrackAction = createBasicAction(PROJECT_UPDATE_TRACK_KEY);
