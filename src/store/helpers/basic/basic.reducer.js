export const createBasicReducer = (key, reducer, initialState = {}) => (
  state = initialState,
  action,
) => {
  if (typeof key !== 'string') {
    throw new Error('Expected key to be string.');
  }
  if (key !== action.type) {
    return state;
  }
  return reducer(state, action);
};
