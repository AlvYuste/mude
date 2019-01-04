import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { pipe } from 'ramda';
import { connect } from 'react-redux';
import { Classes } from '@blueprintjs/core';
import { SortableElement as withSortableElement } from 'react-sortable-hoc';
import { TrackInfo } from './TrackInfo';
import { Flex } from '../../../components/layout/Flex';
import { TrackContent } from './TrackContent';
import { TrackHandle } from './TrackHandle';
import { trackInfoWidth, trackHeight } from '../../../utils/variables';
import * as trckStore from '../../../store/modules/track';

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
const RawTrack = ({
  onChangeTrack,
  track,
  collapsed,
  selected,
  updateTrack,
  ...rest
}) => (
  <TrackWrapper {...rest} className={`${Classes.ELEVATION_1} ${Classes.DARK}`}>
    <TrackHandle selected={selected} />
    <TrackInfoStyled
      track={track}
      collapsed={collapsed}
      selected={selected}
      onChangeTrack={updateTrack}
    />
    <TrackContentStyled />
  </TrackWrapper>
);

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
});
const mapDispatchToProps = dispatch => ({
  updateTrack: track => dispatch(trckStore.updateTrackAction(track)),
  deleteTrack: track => dispatch(trckStore.deleteTrackAction(track)),
});

export const Track = pipe(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withSortableElement,
)(RawTrack);

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
  updateTrack: PropTypes.func.isRequired,
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
};
