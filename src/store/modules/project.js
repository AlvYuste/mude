import * as R from 'ramda';
import uuid from 'uuid';
import { ActionCreators } from 'redux-undo';
import { navigate } from '@reach/router';
import { Intent } from '@blueprintjs/core';
import { createAsyncTypes } from '../helpers/async/async.types';
import { createAsyncReducer, dataLens } from '../helpers/async/async.reducer';
import { createBasicReducer } from '../helpers/basic/basic.reducer';
import { createBasicAction } from '../helpers/basic/basic.action';
import * as projService from '../../services/project';
import { createToastAction } from './toasts';

export const OWN_PROJECTS_KEY = 'OWN_PROJECTS';
export const CURRENT_PROJECT_KEY = 'CURRENT_PROJECT';

export const ownProjectsLens = R.lensProp(OWN_PROJECTS_KEY);
export const currentProjectLens = R.lensPath([CURRENT_PROJECT_KEY, 'present']);
export const projectUndoStackLens = R.lensPath([CURRENT_PROJECT_KEY, 'past']);
export const projectRedoStackLens = R.lensPath([CURRENT_PROJECT_KEY, 'future']);

export const getOwnProjects = R.view(ownProjectsLens);
export const getCurrentProject = R.view(currentProjectLens);
export const getProjectUndoStack = R.view(projectUndoStackLens);
export const getProjectRedoStack = R.view(projectRedoStackLens);

/* OPEN PROJECT */
const OPEN_PROJECT_KEY = 'OPEN_PROJECT';
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
      dispatch(ActionCreators.clearHistory());
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
const SAVE_PROJECT_KEY = 'SAVE_PROJECT';
export const saveProjectReducer = createAsyncReducer(SAVE_PROJECT_KEY);
export const saveProjectAction = () => (dispatch, getState) => {
  const [req, succ, fail] = createAsyncTypes(SAVE_PROJECT_KEY);
  const transactionId = uuid();
  const currentProject = getCurrentProject(getState()).data;
  dispatch({ type: req, transactionId });
  projService.saveProject(currentProject).then(
    response => {
      navigate(`?project=${response.id}`);
      dispatch(
        createToastAction({
          message: 'Project saved successfuly',
          intent: Intent.SUCCESS,
        }),
      );
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

/* CURRENT PROJECT DELETE */
const DELETE_KEY_PROJECT = 'DELETE_PROJECT';
export const deleteProjectReducer = createAsyncReducer(DELETE_KEY_PROJECT, {
  successReducer: () => ({}),
});
export const deleteProjectAction = payload => (dispatch, getState) => {
  const [req, succ, fail] = createAsyncTypes(DELETE_KEY_PROJECT);
  const transactionId = uuid();
  const currentProject = getCurrentProject(getState()).data;
  const projectId = payload || currentProject.id;
  dispatch({ type: req, payload: projectId, transactionId });
  projService.deleteProject(projectId).then(
    response => {
      navigate('/');
      dispatch({ response, payload: projectId, type: succ, transactionId });
      dispatch(ActionCreators.clearHistory());
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

/* PROJECT_NEW */
const NEW_PROJECT_KEY = 'NEW_PROJECT';
export const newProjectReducer = createBasicReducer(
  NEW_PROJECT_KEY,
  () => ({}),
);
export const newProjectAction = () => dispatch => {
  navigate('/');
  dispatch({ type: NEW_PROJECT_KEY, transactionId: uuid() });
  dispatch(ActionCreators.clearHistory());
};

/* PROJECT_UPDATE_NAME */
const PROJECT_UPDATE_NAME_KEY = 'PROJECT_UPDATE_NAME';
export const setProjectNameReducer = createBasicReducer(
  PROJECT_UPDATE_NAME_KEY,
  (state, action) => R.set(dataLens('name'), action.payload, state),
);
export const setProjectNameAction = createBasicAction(PROJECT_UPDATE_NAME_KEY);

/* PROJECT_UPDATE_TRACKS */
const PROJECT_UPDATE_TRACKS_KEY = 'PROJECT_UPDATE_TRACKS';
export const setProjectTracksReducer = createBasicReducer(
  PROJECT_UPDATE_TRACKS_KEY,
  (state, action) => R.set(dataLens('tracks'), action.payload, state),
);
export const setProjectTracksAction = createBasicAction(
  PROJECT_UPDATE_TRACKS_KEY,
);

/* PROJECT_ADD_TRACK */
const PROJECT_ADD_TRACK_KEY = 'PROJECT_ADD_TRACK';
export const addTrackAction = createBasicAction(PROJECT_ADD_TRACK_KEY);
export const addTrackReducer = createBasicReducer(
  PROJECT_ADD_TRACK_KEY,
  (state, action) =>
    R.over(
      dataLens('tracks'),
      R.prepend({ id: action.payload || action.transactionId, volume: 5 }),
      state,
    ),
);

/* HISTORY */

export const undoableActions = [
  PROJECT_ADD_TRACK_KEY,
  PROJECT_UPDATE_TRACKS_KEY,
  PROJECT_UPDATE_NAME_KEY,
];
export const groupableActions = [PROJECT_UPDATE_NAME_KEY];
