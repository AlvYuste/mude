import { createAsyncTypes } from './async.types';

export const createAsyncReducer = (
  key,
  {
    requestReducer = state => ({ ...state, loading: true }),
    successReducer = (state, action) => ({
      data: action.response,
      loading: false,
    }),
    errorReducer = (state, action) => ({ loading: false, error: action.error }),
  } = {},
  initialState = {},
) => (state = initialState, action) => {
  if (typeof key !== 'string') {
    throw new Error('Expected key to be string.');
  }
  const [requestType, successType, failureType] = createAsyncTypes(key);
  if (
    !action ||
    ![requestType, successType, failureType].includes(action.type)
  ) {
    return state;
  }
  switch (action.type) {
    case requestType:
      return requestReducer(state, action);
    case successType:
      return successReducer(state, action);
    case failureType:
      return errorReducer(state, action);
    default:
      return state;
  }
};
