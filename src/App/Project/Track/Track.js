import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { pipe } from 'ramda';
import { connect } from 'react-redux';
import { Classes, Button } from '@blueprintjs/core';
import { SortableElement as withSortableElement } from 'react-sortable-hoc';
import { Flex } from '../../../components/layout/Flex';
import { TRACK_INFO_WIDTH, TRACK_HEIGHT } from '../../../utils/variables';
import * as trckStore from '../../../store/modules/track';
import * as uiStore from '../../../store/modules/ui';
import { noPropagate } from '../../../utils/utils';
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
const TrackInfoStyled = styled(TrackInfo)`
  transition: width ease 200ms, padding ease 200ms;
  width: ${({ collapsed }) => (collapsed ? 0 : TRACK_INFO_WIDTH)};
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
  isSelected,
  isMuted,
  actions,
  ui,
  ...rest
}) => (
  <TrackWrapper
    {...rest}
    isMuted={isMuted}
    className={`${Classes.ELEVATION_1} ${Classes.DARK}`}
  >
    <TrackHandle selected={isSelected} />
    <TrackInfoStyled
      track={track}
      collapsed={ui.collapsed}
      selected={isSelected}
      onChangeTrack={actions.updateTrack}
      onChangeName={value => actions.setTrackName({ id: track.id, value })}
      onChangeVolume={value => actions.setTrackVolume({ id: track.id, value })}
      onChangePan={value => actions.setTrackPan({ id: track.id, value })}
    />
    <TrackContentStyled
      onSelectTime={actions.selectTime}
      collapsed={ui.collapsed}
      timeSelected={ui.timeSelected}
      isSelected={isSelected}
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
const mapDispatchToProps = dispatch => ({
  actions: {
    setTrackPan: ({ id, value }) =>
      dispatch(trckStore.setTrackPanAction({ id, value })),
    setTrackName: ({ id, value }) =>
      dispatch(trckStore.setTrackNameAction({ id, value })),
    setTrackVolume: ({ id, value }) =>
      dispatch(trckStore.setTrackVolumeAction({ id, value })),
    updateTrack: track => dispatch(trckStore.updateTrackAction(track)),
    deleteTrack: trackId => dispatch(trckStore.deleteTrackAction(trackId)),
    selectTime: offset => dispatch(uiStore.selectTimeAction(offset)),
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
