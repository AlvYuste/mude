import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Colors } from '@blueprintjs/core';
import { Flex } from '../../../components/layout/Flex';
import { Collapse } from './Collapse';

const SEGMENT_TICKS = 10;
const MIDDLE_TICK = Math.floor(SEGMENT_TICKS / 2);
const ticks = Array(SEGMENT_TICKS).fill();

const Tick = styled.div`
  border-left: solid 1px ${Colors.DARK_GRAY2};
  color: black;
  user-select: none;
  font-size: 0.65rem;
  align-self: flex-end;
  flex-shrink: 0;
  width: 0.5rem;
  padding-left: 0.25rem;
  line-height: 0.5;
  height: ${({ main, middle }) =>
    (main && '1rem') || (middle && '0.75rem') || '0.25rem'};
  border-color: ${({ main }) => main && Colors.DARK_GRAY1};
`;

const renderSegment = (start, length) =>
  ticks.map((_, i) => {
    const tickValue = (start + i * (length / SEGMENT_TICKS)) / 1000;
    const tickType =
      (i === 0 && 'main') || (i === MIDDLE_TICK && 'middle') || '';
    return (
      <Tick
        key={`${tickType}${tickValue}`}
        main={tickType === 'main' ? 1 : 0}
        middle={tickType === 'middle' ? 1 : 0}
      >
        {i === 0 && `${start / 1000}`}
      </Tick>
    );
  });
/**
 *
 * @prop {number} duration Indicates how many miliseconds has to be drawn
 * @prop {number} zoom Indicates how many segments are drawn for one second
 */
export const Timeline = ({ duration, zoom, ...rest }) => {
  const segmentLength = Math.floor(1000 / zoom);
  const segmentsCount = duration ? duration / segmentLength : 10;
  const segments = Array(segmentsCount).fill();
  return (
    <Flex>
      <Collapse {...rest} />
      {segments.map((_, i) => renderSegment(i * segmentLength, segmentLength))}
    </Flex>
  );
};
Timeline.propTypes = {
  duration: PropTypes.number,
  zoom: PropTypes.number,
  collapsed: PropTypes.bool,
  onCollapsedChange: PropTypes.func,
};
Timeline.defaultProps = {
  duration: 0,
  zoom: 1,
  collapsed: false,
  onCollapsedChange: () => {},
};
