import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Colors } from '@blueprintjs/core';
import { SortableContainer as withSortableContainer } from 'react-sortable-hoc';

import { Track } from './Track/Track';
import { FlexResponsive } from '../../components/layout/Flex';

const TracksListWrapper = styled(FlexResponsive)`
  background-color: ${Colors.DARK_GRAY3};
  padding-bottom: 3.5rem;
`;

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
  collapsed,
  onChangeTrack,
  selectedTrackId,
  onClickTrack,
}) => (
  <TracksListWrapper direction="column">
    {!!tracks &&
      tracks.map((track, i) => (
        <Track
          key={track.id}
          index={i}
          track={track}
          collapsed={collapsed}
          selected={selectedTrackId === track.id}
          shouldMute={shouldMuteTrack(track, tracks)}
          onChangeTrack={onChangeTrack}
          onClick={() => onClickTrack(track)}
        />
      ))}
  </TracksListWrapper>
);
RawTracksList.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.object),
  collapsed: PropTypes.bool,
  selectedTrackId: PropTypes.string,
  onClickTrack: PropTypes.func,
  onChangeTrack: PropTypes.func,
};
RawTracksList.defaultProps = {
  tracks: [],
  collapsed: false,
  selectedTrackId: undefined,
  onClickTrack: () => {},
  onChangeTrack: () => {},
};

export const TracksList = withSortableContainer(RawTracksList);
