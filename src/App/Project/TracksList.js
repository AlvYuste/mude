import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Colors } from '@blueprintjs/core';
import { SortableContainer as withSortableContainer } from 'react-sortable-hoc';

import { Track } from './Track/Track';
import { FlexResponsive } from '../../components/layout/Flex';

const TracksListWrapper = styled(FlexResponsive)`
  background-color: ${Colors.DARK_GRAY3};
`;

const RawTracksList = ({
  tracks,
  selectedTracks,
  onSelectTracks,
  onChangeTrack,
  ...rest
}) => {
  const soloTracks = tracks.filter(trck => trck.solo);
  return (
    <TracksListWrapper {...rest} direction="column">
      {!!tracks &&
        tracks.map((track, i) => {
          const isSelected = selectedTracks.includes(track.id);
          return (
            <Track
              key={track.id}
              index={i}
              track={track}
              isSelected={isSelected}
              isMuted={
                !!track.mute ||
                !track.volume ||
                (!!soloTracks.length && !soloTracks.includes(track))
              }
              onChangeTrack={onChangeTrack}
              onClick={e =>
                e.ctrlKey
                  ? onSelectTracks(
                      isSelected
                        ? selectedTracks.filter(t => t !== track.id)
                        : [...selectedTracks, track.id],
                    )
                  : onSelectTracks([track.id])
              }
            />
          );
        })}
    </TracksListWrapper>
  );
};
RawTracksList.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.object),
  selectedTracks: PropTypes.arrayOf(PropTypes.string),
  onSelectTracks: PropTypes.func,
  onChangeTrack: PropTypes.func,
};
RawTracksList.defaultProps = {
  tracks: [],
  selectedTracks: [],
  onSelectTracks: () => {},
  onChangeTrack: () => {},
};

export const TracksList = withSortableContainer(RawTracksList);
