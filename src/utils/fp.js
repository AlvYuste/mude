/* Functions to help with Functional programming and immutability */
import * as R from 'ramda';

// (a -> Boolean) -> Lens [a] a
export const lensMatching = pred => toF => entities => {
  const index = R.findIndex(pred, entities);
  return R.map(
    entity => R.update(index, entity, entities),
    toF(entities[index]),
  );
};

// String -> Lens [{ id: String }] { id: String }
export const lensById = R.compose(
  lensMatching,
  R.propEq('id'),
);
