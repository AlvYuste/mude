import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Button } from '@blueprintjs/core';
import { trackInfoWidth, trackHandleWidth } from '../../utils/variables';
import { Flex } from '../../components/layout/Flex';

const CollapseWrapper = styled.div`
  transition: width ease 200ms, margin-left ease 200ms;
  width: ${({ collapsed }) => (collapsed ? trackHandleWidth : trackInfoWidth)};
  margin-left: ${({ collapsed }) => (collapsed ? 0 : trackHandleWidth)};
  text-align: right;
`;
const CollapseButton = styled(Button)`
  transition: min-width ease 200ms, padding ease 200ms;
  min-width: ${({ collapsed }) => (collapsed ? trackHandleWidth : '')};
  padding: ${({ collapsed }) => (collapsed ? 0 : '')};
`;
export const Timeline = ({ /* duration, */ collapsed, onCollapsedChange }) => (
  <Flex>
    <CollapseWrapper collapsed={collapsed}>
      <CollapseButton
        minimal
        collapsed={collapsed}
        icon={collapsed ? 'chevron-right' : 'chevron-left'}
        onClick={() => onCollapsedChange(!collapsed)}
      />
    </CollapseWrapper>
    {/* {duration} */}
  </Flex>
);

Timeline.propTypes = {
  // duration: PropTypes.number,
  collapsed: PropTypes.bool,
  onCollapsedChange: PropTypes.func,
};
Timeline.defaultProps = {
  // duration: 10000,
  collapsed: false,
  onCollapsedChange: () => {},
};
