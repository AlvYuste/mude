import uuid from 'uuid';

export const createBasicAction = (
  key,
  asyncFunction = undefined,
) => payload => dispatch => {
  if (typeof key !== 'string') {
    throw new Error('Expected key to be string.');
  }
  const transactionId = uuid();
  if (!asyncFunction) {
    return dispatch({ type: key, payload, transactionId });
  }
  const result = asyncFunction(payload);
  if (!result || !result.then) {
    return dispatch({
      response: result,
      payload,
      type: key,
      transactionId,
    });
  }
  return result.then(
    response => dispatch({ response, payload, type: key, transactionId }),
    error =>
      dispatch({
        payload,
        type: key,
        error: error.message,
        transactionId,
      }),
  );
};
