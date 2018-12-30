import React from 'react';
import PropTypes from 'prop-types';

import { SortableContainer as withSortableContainer } from 'react-sortable-hoc';
import { Track } from './Track/Track';
import { FlexResponsive } from '../../components/layout/Flex';

const shouldMuteTrack = (track, tracks) => {
  if (track.mute || !track.volume) {
    return true;
  }
  const soloTracks = tracks.reduce(
    (memo, curr) => (curr.solo ? [...memo, curr.id] : memo),
    [],
  );
  return soloTracks.length > 0 && !soloTracks.includes(track.id);
};

const RawTracksList = ({
  tracks,
  onChangeTrack,
  selectedTrackId,
  onClickTrack,
}) => (
  <FlexResponsive direction="column" spaced>
    {!!tracks &&
      tracks.map((track, i) => (
        <Track
          key={track.id}
          index={i}
          track={track}
          isSelected={selectedTrackId === track.id}
          shouldMute={shouldMuteTrack(track, tracks)}
          onChangeTrack={onChangeTrack}
          onClick={() => onClickTrack(track)}
        />
      ))}
  </FlexResponsive>
);
RawTracksList.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.object),
  selectedTrackId: PropTypes.string,
  onClickTrack: PropTypes.func,
  onChangeTrack: PropTypes.func,
};
RawTracksList.defaultProps = {
  tracks: [],
  selectedTrackId: undefined,
  onClickTrack: () => {},
  onChangeTrack: () => {},
};

export const TracksList = withSortableContainer(RawTracksList);
