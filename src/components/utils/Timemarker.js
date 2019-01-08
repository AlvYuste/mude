import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { TICK_WIDTH } from '../../utils/variables';

const TimemarkerWrapper = styled.div`
  height: 100%;
  z-index: 4;
  position: absolute;
  border-left: 1px solid ${({ color }) => color || 'white'};
  left: ${({ offset }) => `${offset}px`};
  transition: margin-left ease 200ms;
  padding: calc(${TICK_WIDTH} / 2);
  font-size: 0.75rem;
  line-height: 2;
`;

export const Timemarker = ({ children, ...rest }) => (
  <TimemarkerWrapper {...rest}>{children}</TimemarkerWrapper>
);

Timemarker.propTypes = {
  collapsed: PropTypes.bool,
  offset: PropTypes.number,
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};
Timemarker.defaultProps = {
  collapsed: false,
  offset: 0,
  color: '',
};
