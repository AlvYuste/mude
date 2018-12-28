import React from 'react';
import PropTypes from 'prop-types';

import { SortableContainer as withSortableContainer } from 'react-sortable-hoc';
import { Track } from './Track/Track';
import { FlexResponsive } from '../../components/layout/Flex';

const shouldMuteTrack = (track, tracks) => {
  const soloTracks = tracks.reduce(
    (memo, curr) => (curr.solo ? [...memo, curr.id] : memo),
    [],
  );
  return (
    track.mute ||
    !track.volume ||
    (soloTracks.length > 0 && !soloTracks.includes(track.id))
  );
};

const RawTracksList = ({ tracks, onChangeTrack }) => (
  <FlexResponsive direction="column" spaced>
    {!!tracks &&
      tracks.map((track, i) => (
        <Track
          key={track.id}
          index={i}
          track={track}
          shouldMute={shouldMuteTrack(track, tracks)}
          onChangeTrack={onChangeTrack}
        />
      ))}
  </FlexResponsive>
);
RawTracksList.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.object),
  onChangeTrack: PropTypes.func,
};
RawTracksList.defaultProps = {
  tracks: [],
  onChangeTrack: () => {},
};

export const TracksList = withSortableContainer(RawTracksList);
