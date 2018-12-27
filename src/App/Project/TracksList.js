import React from 'react';
import PropTypes from 'prop-types';

import { SortableContainer as withSortableContainer } from 'react-sortable-hoc';
import { Track } from './Track/Track';
import { FlexResponsive } from '../../components/layout/Flex';

const RawTracksList = ({ tracks }) => (
  <FlexResponsive direction="column" spaced>
    {!!tracks &&
      tracks.map((track, i) => (
        <Track key={track.id} index={i} track={track} />
      ))}
  </FlexResponsive>
);

RawTracksList.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.shape(Track.propTypes)),
};
RawTracksList.defaultProps = {
  tracks: [],
};

export const TracksList = withSortableContainer(RawTracksList);
