import * as R from 'ramda';
import { lensById } from '../../utils/fp';
import { trackPropLens } from './track';
import { currentProjectLens } from './project';

export const clipsLens = trackId =>
  R.compose(
    currentProjectLens,
    trackPropLens(trackId, 'clips'),
  );

export const clipLens = (trackId, clipId) =>
  R.compose(
    clipsLens(trackId),
    lensById(clipId),
  );

export const clipPropLens = (trackId, clipId, prop) =>
  R.compose(
    clipLens(trackId, clipId),
    Array.isArray(prop) ? R.lensPath(prop) : R.lensProp(prop),
  );
