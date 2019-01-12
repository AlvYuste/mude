import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { pipe } from 'ramda';
import { connect } from 'react-redux';
import { Classes, Button } from '@blueprintjs/core';
import { SortableElement as withSortableElement } from 'react-sortable-hoc';
import { Flex } from '../../../components/layout/Flex';
import { TRACK_HEIGHT } from '../../../utils/variables';
import * as trckStore from '../../../store/modules/track';
import * as uiStore from '../../../store/modules/ui';
import { noPropagate } from '../../../utils/events';
import { TrackHandle } from './TrackHandle';
import { TrackContent } from './TrackContent';
import { TrackInfo } from './TrackInfo';

const deleteButtonClass = 'track-delete-button';
const TrackWrapper = styled(Flex)`
  position: relative;
  height: ${TRACK_HEIGHT};
  opacity: ${({ isMuted }) => (isMuted ? 0.5 : 1)};
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
const TrackDeleteButton = styled(Button)`
  position: absolute;
  left: 0;
  top: 0;
`;
const RawTrack = ({ track, isSelected, isMuted, actions, ui, ...rest }) => (
  <TrackWrapper
    {...rest}
    isMuted={isMuted}
    className={`${Classes.ELEVATION_1} ${Classes.DARK}`}
  >
    <TrackHandle selected={isSelected} />
    <TrackInfo
      track={track}
      collapsed={ui.collapsed}
      selected={isSelected}
      onChangeTrack={actions.updateTrack}
      onChangeName={actions.setTrackName}
      onChangeVolume={actions.setTrackVolume}
      onChangePan={actions.setTrackPan}
    />
    <TrackContent
      track={track}
      zoom={ui.zoom}
      collapsed={ui.collapsed}
      timeSelected={ui.timeSelected}
      isSelected={isSelected}
      onSelectTime={actions.selectTime}
    />

    <TrackDeleteButton
      minimal
      icon="cross"
      className={deleteButtonClass}
      onClick={noPropagate(() => actions.deleteTrack(track.id))}
    />
  </TrackWrapper>
);

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  ui: state[uiStore.UI_KEY],
});
const mapDispatchToProps = (dispatch, { track: { id } }) => ({
  actions: {
    setTrackPan: value => dispatch(trckStore.setTrackPanAction({ id, value })),
    setTrackName: value =>
      dispatch(trckStore.setTrackNameAction({ id, value })),
    setTrackVolume: value =>
      dispatch(trckStore.setTrackVolumeAction({ id, value })),
    updateTrack: track => dispatch(trckStore.updateTrackAction(track)),
    deleteTrack: trackId => dispatch(trckStore.deleteTrackAction(trackId)),
    selectTime: time => dispatch(uiStore.selectTimeAction(time)),
  },
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
    id: PropTypes.string,
    name: PropTypes.string,
    volume: PropTypes.number,
    pan: PropTypes.number,
    mute: PropTypes.bool,
    solo: PropTypes.bool,
  }),
  isSelected: PropTypes.bool,
  isMuted: PropTypes.bool,
  ui: PropTypes.object,
  actions: PropTypes.object,
};

RawTrack.defaultProps = {
  track: {
    name: '',
    volume: 5,
    pan: 0,
    mute: false,
    solo: false,
  },
  isSelected: false,
  isMuted: false,
  ui: {},
  actions: {},
};
