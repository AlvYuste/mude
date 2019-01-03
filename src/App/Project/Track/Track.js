import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Classes } from '@blueprintjs/core';
import { SortableElement as withSortableElement } from 'react-sortable-hoc';
import { TrackInfo } from './TrackInfo';
import { Flex } from '../../../components/layout/Flex';
import { TrackContent } from './TrackContent';
import { TrackHandle } from './TrackHandle';
import { trackInfoWidth, trackHeight } from '../../../utils/variables';

const TrackWrapper = styled(Flex)`
  position: relative;
  height: ${trackHeight};
  opacity: ${({ shouldMute }) => (shouldMute ? 0.5 : 1)};
`;
const TrackInfoStyled = styled(TrackInfo)`
  transition: width ease 200ms, padding ease 200ms;
  width: ${({ collapsed }) => (collapsed ? 0 : trackInfoWidth)};
  padding: ${({ collapsed }) => (collapsed ? 0 : '')};
`;
const TrackContentStyled = styled(TrackContent)`
  flex: 1;
`;
const RawTrack = ({ onChangeTrack, track, collapsed, selected, ...rest }) => (
  <TrackWrapper {...rest} className={`${Classes.ELEVATION_1} ${Classes.DARK}`}>
    <TrackHandle selected={selected} />
    <TrackInfoStyled
      track={track}
      collapsed={collapsed}
      selected={selected}
      onChangeTrack={onChangeTrack}
    />
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
  collapsed: PropTypes.bool,
  selected: PropTypes.bool,
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
  collapsed: false,
  selected: false,
  onChangeTrack: () => {},
};
