import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { pipe } from 'ramda';
import { connect } from 'react-redux';
import { Classes, Button } from '@blueprintjs/core';
import { SortableElement as withSortableElement } from 'react-sortable-hoc';
import { trackInfoWidth, trackHeight } from '../../../utils/variables';
import { noPropagate } from '../../../utils/utils';
import { Flex } from '../../../components/layout/Flex';
import * as trckStore from '../../../store/modules/track';

import { TrackHandle } from './TrackHandle';
import { TrackContent } from './TrackContent';
import { TrackInfo } from './TrackInfo';

const deleteButtonClass = 'track-delete-button';
const TrackWrapper = styled(Flex)`
  position: relative;
  height: ${trackHeight};
  opacity: ${({ shouldMute }) => (shouldMute ? 0.5 : 1)};
  .${deleteButtonClass} {
    transition: opacity 200ms ease;
    opacity: 0;
  }
  &:hover {
    .${deleteButtonClass} {
      opacity: 1;
    }
  }
`;
const TrackInfoStyled = styled(TrackInfo)`
  transition: width ease 200ms, padding ease 200ms;
  width: ${({ collapsed }) => (collapsed ? 0 : trackInfoWidth)};
  padding: ${({ collapsed }) => (collapsed ? 0 : '')};
`;
const TrackContentStyled = styled(TrackContent)`
  flex: 1;
`;
const TrackDeleteButton = styled(Button)`
  position: absolute;
  right: 0;
  top: 0;
`;

const RawTrack = ({
  onChangeTrack,
  track,
  collapsed,
  selected,
  updateTrack,
  setTrackPan,
  setTrackName,
  setTrackVolume,
  deleteTrack,
  ...rest
}) => (
  <TrackWrapper {...rest} className={`${Classes.ELEVATION_1} ${Classes.DARK}`}>
    <TrackHandle selected={selected} />
    <TrackInfoStyled
      track={track}
      collapsed={collapsed}
      selected={selected}
      onChangeTrack={updateTrack}
      onChangeName={value => setTrackName({ id: track.id, value })}
      onChangeVolume={value => setTrackVolume({ id: track.id, value })}
      onChangePan={value => setTrackPan({ id: track.id, value })}
    />
    <TrackContentStyled />
    <TrackDeleteButton
      minimal
      icon="cross"
      className={deleteButtonClass}
      onClick={noPropagate(() => deleteTrack(track.id))}
    />
  </TrackWrapper>
);

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
});
const mapDispatchToProps = dispatch => ({
  setTrackPan: ({ id, value }) =>
    dispatch(trckStore.setTrackPanAction({ id, value })),
  setTrackName: ({ id, value }) =>
    dispatch(trckStore.setTrackNameAction({ id, value })),
  setTrackVolume: ({ id, value }) =>
    dispatch(trckStore.setTrackVolumeAction({ id, value })),
  updateTrack: track => dispatch(trckStore.updateTrackAction(track)),
  deleteTrack: trackId => dispatch(trckStore.deleteTrackAction(trackId)),
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
  setTrackPan: PropTypes.func.isRequired,
  setTrackName: PropTypes.func.isRequired,
  setTrackVolume: PropTypes.func.isRequired,
  updateTrack: PropTypes.func.isRequired,
  deleteTrack: PropTypes.func.isRequired,
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
