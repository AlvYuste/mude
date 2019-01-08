import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {
  TRACK_HANDLE_WIDTH,
  TRACK_INFO_WIDTH,
  TICK_WIDTH,
} from '../../utils/variables';

const TimemarkerWrapper = styled.div`
  height: 100%;
  z-index: 1;
  position: absolute;
  border-left: 1px solid ${({ color }) => color || 'white'};
  left: ${({ offset }) => `${offset}px`};
  transition: margin-left ease 200ms;
  pointer-events: none;
  margin-left: ${({ collapsed }) =>
    collapsed
      ? TRACK_HANDLE_WIDTH
      : `calc(${TRACK_HANDLE_WIDTH} + ${TRACK_INFO_WIDTH})`};
  padding: calc(${TICK_WIDTH} / 2);
  font-size: 0.75rem;
  line-height: 2;
`;

export const Timemarker = ({ label, ...rest }) => (
  <TimemarkerWrapper {...rest}>{label}</TimemarkerWrapper>
);

Timemarker.propTypes = {
  collapsed: PropTypes.bool,
  offset: PropTypes.number,
  label: PropTypes.string,
  color: PropTypes.string,
};
Timemarker.defaultProps = {
  collapsed: false,
  offset: 0,
  label: '',
  color: '',
};
