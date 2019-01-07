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
  collapsed,
  onChangeTrack,
  ...rest
}) => (
  <TracksListWrapper {...rest} direction="column">
    {!!tracks &&
      tracks.map((track, i) => {
        const isSelected = selectedTracks.includes(track.id);
        return (
          <Track
            key={track.id}
            index={i}
            track={track}
            collapsed={collapsed}
            selected={isSelected}
            shouldMute={(() => {
              if (track.mute || !track.volume) {
                return true;
              }
              const soloTracks = tracks.reduce(
                (memo, curr) => (curr.solo ? [...memo, curr.id] : memo),
                [],
              );
              return soloTracks.length > 0 && !soloTracks.includes(track.id);
            })()}
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
RawTracksList.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.object),
  collapsed: PropTypes.bool,
  selectedTracks: PropTypes.arrayOf(PropTypes.string),
  onSelectTracks: PropTypes.func,
  onChangeTrack: PropTypes.func,
};
RawTracksList.defaultProps = {
  tracks: [],
  collapsed: false,
  selectedTracks: [],
  onSelectTracks: () => {},
  onChangeTrack: () => {},
};

export const TracksList = withSortableContainer(RawTracksList);
