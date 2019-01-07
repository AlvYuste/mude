import * as R from 'ramda';
import uuid from 'uuid';
import { navigate } from '@reach/router';
import { createAsyncReducer } from '../helpers/async/async.reducer';
import { createBasicReducer } from '../helpers/basic/basic.reducer';
import { createBasicAction } from '../helpers/basic/basic.action';
import * as projService from '../../services/project';
import { createAsyncTypes } from '../helpers/async/async.types';

const dataLense = prop => R.lensPath(['data', prop]);

export const CURRENT_PROJECT_KEY = 'CURRENT_PROJECT';

/* OPEN PROJECT */
export const OPEN_PROJECT_KEY = 'OPEN_PROJECT';
export const openProjectReducer = createAsyncReducer(OPEN_PROJECT_KEY);
export const openProjectAction = payload => dispatch => {
  const [req, succ, fail] = createAsyncTypes(OPEN_PROJECT_KEY);
  const transactionId = uuid();
  dispatch({ type: req, payload });
  projService
    .getProjectDetail(payload, asyncResponse => {
      navigate(`/?project=${payload}`);
      dispatch({
        type: succ,
        response: asyncResponse,
        payload,
      });
    })
    .catch(error =>
      dispatch({
        type: fail,
        transactionId,
        payload,
        error,
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
  projService
    .getOwnProjects(asyncResponse =>
      dispatch({
        type: succ,
        response: asyncResponse,
      }),
    )
    .catch(error =>
      dispatch({
        type: fail,
        transactionId,
        error,
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
  projService.saveProject(currentProject).then(
    response => {
      navigate(`?project=${response.id}`);
      dispatch({ response, type: succ, transactionId });
    },
    error =>
      dispatch({
        type: fail,
        transactionId,
        error,
      }),
  );
};
export const saveProjectReducer = createAsyncReducer(PROJECT_SAVE_KEY);

/* CURRENT PROJECT DELETE */
export const PROJECT_DELETE_KEY = 'PROJECT_DELETE';
export const deleteProjectAction = payload => (dispatch, getState) => {
  const [req, succ, fail] = createAsyncTypes(PROJECT_DELETE_KEY);
  const transactionId = uuid();
  const {
    [CURRENT_PROJECT_KEY]: { data: currentProject },
  } = getState();
  const projectId = payload || currentProject.id;
  dispatch({ type: req, payload: projectId, transactionId });
  projService.deleteProject(projectId).then(
    response => {
      navigate('/');
      dispatch({ response, payload: projectId, type: succ, transactionId });
    },
    error =>
      dispatch({
        type: fail,
        transactionId,
        payload: projectId,
        error,
      }),
  );
};
export const deleteProjectReducer = createAsyncReducer(PROJECT_DELETE_KEY, {
  successReducer: () => ({}),
});

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
