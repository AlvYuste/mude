import { createAsyncTypes } from './async.types';

export const createAsyncReducerTemplate = (
  key,
  { request, success, error },
) => (state, action) => {
  const [requestType, successType, failureType] = createAsyncTypes(key);
  if (
    !action ||
    ![requestType, successType, failureType].includes(action.type)
  ) {
    return state;
  }
  switch (action.type) {
    case requestType:
      return request(state, action);
    case successType:
      return success(state, action);
    case failureType:
      return error(state, action);
    default:
      return state;
  }
};
