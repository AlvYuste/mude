import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Classes } from '@blueprintjs/core';
import { TrackInfo } from './TrackInfo';
import { Flex } from '../../../components/layout/Flex';
import { TrackContent } from './TrackContent';

const TrackWrapper = styled(Flex)`
  height: 10rem;
`;
const TrackInfoStyled = styled(TrackInfo)`
  width: 10rem;
`;
const TrackContentStyled = styled(TrackContent)`
  flex: 1;
`;
export const Track = props => (
  <TrackWrapper className={Classes.NAVBAR}>
    <TrackInfoStyled {...props} />
    <TrackContentStyled />
  </TrackWrapper>
);

Track.propTypes = {
  name: PropTypes.string,
  volume: PropTypes.number,
};

Track.defaultProps = {
  name: '',
  volume: 5,
};
