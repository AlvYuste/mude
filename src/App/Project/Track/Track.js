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
`;
const TrackInfoStyled = styled(TrackInfo)`
  width: 10rem;
`;
const TrackContentStyled = styled(TrackContent)`
  flex: 1;
`;
const RawTrack = props => (
  <TrackWrapper className={`${Classes.ELEVATION_1} ${Classes.DARK}`}>
    <TrackHandle />
    <TrackInfoStyled {...props} />
    <TrackContentStyled />
  </TrackWrapper>
);

export const Track = withSortableElement(RawTrack);

Track.propTypes = {
  name: PropTypes.string,
  volume: PropTypes.number,
  pan: PropTypes.number,
  mute: PropTypes.bool,
  solo: PropTypes.bool,
};

Track.defaultProps = {
  name: '',
  volume: 5,
  pan: 0,
  mute: false,
  solo: false,
};
