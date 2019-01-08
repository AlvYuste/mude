import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {
  TRACK_HANDLE_WIDTH,
  TRACK_INFO_WIDTH,
  TICK_WIDTH,
} from '../../../utils/variables';
import { getOffsetFromTime } from '../../../utils/utils';

const TimemarkerWrapper = styled.div`
  height: 100%;
  z-index: 1;
  position: absolute;
  border-left: 1px solid white;
  left: ${({ offset }) => `${offset}px`};
  transition: margin-left ease 200ms;
  pointer-events: none;
  margin-left: ${({ collapsed }) =>
    collapsed
      ? TRACK_HANDLE_WIDTH
      : `calc(${TRACK_HANDLE_WIDTH} + ${TRACK_INFO_WIDTH})`};
  padding: calc(${TICK_WIDTH} / 2);
  padding: 5px;
  font-size: 0.75rem;
  line-height: 2;
`;

export const Timemarker = ({ collapsed, timeSelected }) => (
  <TimemarkerWrapper
    collapsed={collapsed}
    offset={getOffsetFromTime(timeSelected)}
  >
    {timeSelected / 1000}s
  </TimemarkerWrapper>
);

Timemarker.propTypes = {
  collapsed: PropTypes.bool,
  timeSelected: PropTypes.number,
};
Timemarker.defaultProps = {
  collapsed: false,
  timeSelected: 0,
};
