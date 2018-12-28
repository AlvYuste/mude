import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Classes } from '@blueprintjs/core';
import { SortableElement as withSortableElement } from 'react-sortable-hoc';
import { TrackInfo } from './TrackInfo';
import { Flex } from '../../../components/layout/Flex';
import { TrackContent } from './TrackContent';
import { TrackHandle } from './TrackHandle';

const TrackWrapper = styled(Flex)`
  height: 10rem;
  opacity: ${({ shouldMute }) => (shouldMute ? 0.5 : 1)};
`;
const TrackInfoStyled = styled(TrackInfo)`
  width: 10rem;
`;
const TrackContentStyled = styled(TrackContent)`
  flex: 1;
`;
const RawTrack = ({ onChangeTrack, track, ...rest }) => (
  <TrackWrapper {...rest} className={`${Classes.ELEVATION_1} ${Classes.DARK}`}>
    <TrackHandle />
    <TrackInfoStyled track={track} onChangeTrack={onChangeTrack} />
    <TrackContentStyled />
  </TrackWrapper>
);

export const Track = withSortableElement(RawTrack);

RawTrack.propTypes = {
  track: PropTypes.shape({
    name: PropTypes.string,
    volume: PropTypes.number,
    pan: PropTypes.number,
    mute: PropTypes.bool,
    solo: PropTypes.bool,
  }),
  onChangeTrack: PropTypes.func,
};

RawTrack.defaultProps = {
  track: {
    name: '',
    volume: 5,
    pan: 0,
    mute: false,
    solo: false,
  },
  onChangeTrack: () => {},
};
