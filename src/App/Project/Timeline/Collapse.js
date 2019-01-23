import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Button } from '@blueprintjs/core';
import { TRACK_HANDLE_WIDTH, TRACK_INFO_WIDTH } from '../../../utils/variables';

const CollapseWrapper = styled.div`
  transition: width ease 200ms, margin-left ease 200ms;
  width: ${({ collapsed }) =>
    collapsed ? TRACK_HANDLE_WIDTH : TRACK_INFO_WIDTH};
  margin-left: ${({ collapsed }) => (collapsed ? 0 : TRACK_HANDLE_WIDTH)};
  text-align: right;
  flex-shrink: 0;
  position: sticky;
  left: ${({ collapsed }) => (collapsed ? 0 : TRACK_HANDLE_WIDTH)};
  z-index: 1;
`;
const CollapseButton = styled(Button)`
  transition: min-width ease 200ms, padding ease 200ms;
  min-width: ${({ collapsed }) => (collapsed ? TRACK_HANDLE_WIDTH : '')};
  padding: ${({ collapsed }) => (collapsed ? 0 : '')};
`;

export const Collapse = ({ collapsed, onCollapsedChange }) => (
  <CollapseWrapper collapsed={collapsed}>
    <CollapseButton
      minimal
      collapsed={collapsed ? 1 : 0}
      icon={collapsed ? 'chevron-right' : 'chevron-left'}
      onClick={onCollapsedChange}
    />
  </CollapseWrapper>
);

Collapse.propTypes = {
  collapsed: PropTypes.bool,
  onCollapsedChange: PropTypes.func,
};
Collapse.defaultProps = {
  collapsed: false,
  onCollapsedChange: () => {},
};
