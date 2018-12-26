import { createAsyncTypes } from './async.types';

export const createAsyncReducer = (key, initialState = {}) => {
  if (typeof key !== 'string') {
    throw new Error('Expected key to be string.');
  }
  const [requestType, successType, failureType] = createAsyncTypes(key);

  const asyncReducer = (state = initialState, action) => {
    switch (action.type) {
      case requestType:
        return { ...state, loading: true };
      case successType:
        return { data: action.response, loading: false };
      case failureType:
        return { loading: false, error: action.error };
      default:
        return state;
    }
  };

  return (state = initialState, action) =>
    action && [requestType, successType, failureType].includes(action.type)
      ? asyncReducer(state, action)
      : state;
};
