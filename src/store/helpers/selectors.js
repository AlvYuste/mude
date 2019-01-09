import * as R from 'ramda';
import { selectedTracksIdsLens } from '../modules/ui';
import { tracksLens, currentProjectLens } from '../modules/project';

export const getSelectedTracks = state => {
  const selectedTracksIds = R.view(selectedTracksIdsLens, state);
  const currentProject = R.view(currentProjectLens, state);
  const currentTracks = R.view(tracksLens, currentProject);
  return currentTracks
    ? currentTracks.filter(track => selectedTracksIds.includes(track.id))
    : [];
};
