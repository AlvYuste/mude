import uuid from 'uuid';
import { createAsyncTypes } from './async.types';

export const createRequestAction = (key, payload, transactionId = uuid()) => ({
  type: createAsyncTypes(key)[0],
  payload,
  transactionId,
});
export const createSuccessAction = (
  key,
  payload,
  response,
  transactionId = uuid(),
) => ({
  type: createAsyncTypes(key)[1],
  payload,
  transactionId,
  response,
});
export const createErrorAction = (
  key,
  payload,
  error,
  transactionId = uuid(),
) => ({
  type: createAsyncTypes(key)[2],
  payload,
  transactionId,
  error,
});
export const REQUEST = 'request';
export const SUCCESS = 'success';
export const ERROR = 'error';
export const actionCreators = {
  [REQUEST]: createRequestAction,
  [SUCCESS]: createSuccessAction,
  [ERROR]: createErrorAction,
};
export const createAsyncAction = (
  key,
  asyncFunction = () => true,
) => payload => (dispatch, getState) => {
  if (typeof key !== 'string') {
    throw new Error('Expected key to be string.');
  }
  const [requestType, successType, failureType] = createAsyncTypes(key);
  const transactionId = uuid();
  dispatch({ type: requestType, payload, transactionId });
  const result = asyncFunction(payload, getState());
  if (!result || !result.then) {
    return dispatch({
      response: result,
      payload,
      type: successType,
      transactionId,
    });
  }
  return result.then(
    response =>
      dispatch({ response, payload, type: successType, transactionId }),
    error =>
      dispatch({
        payload,
        type: failureType,
        error,
        transactionId,
      }),
  );
};
