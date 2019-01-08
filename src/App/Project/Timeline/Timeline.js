import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Colors, Classes } from '@blueprintjs/core';
import { Flex } from '../../../components/layout/Flex';
import { Timemarker } from '../../../components/utils/Timemarker';
import {
  getEventRelativeCoords,
  getOffsetFromTime,
} from '../../../utils/utils';
import { TICK_WIDTH, TICKS_PER_SEGEMNT } from '../../../utils/variables';
import { Collapse } from './Collapse';

const tickMiddle = Math.floor(TICKS_PER_SEGEMNT / 2);
const ticks = Array(TICKS_PER_SEGEMNT).fill();

const Tick = styled.div`
  border-left: solid 1px ${Colors.DARK_GRAY2};
  color: black;
  user-select: none;
  font-size: 0.75rem;
  align-self: flex-end;
  flex-shrink: 0;
  width: ${TICK_WIDTH};
  padding-left: calc(${TICK_WIDTH} / 2);
  line-height: 0.5;
  height: ${({ main, middle }) =>
    (main && '1rem') || (middle && '0.75rem') || '0.25rem'};
  border-color: ${({ main }) => main && Colors.DARK_GRAY1};
  pointer-events: none;
`;
const TimelineWrapper = styled(Flex)`
  background-color: ${Colors.DARK_GRAY5};
  position: sticky;
  top: 0;
  z-index: 10;
`;
const TicksWrapper = styled(Flex)`
  position: relative;
`;

const renderSegment = (start, length) =>
  ticks.map((_, i) => {
    const tickValue = (start + i * (length / TICKS_PER_SEGEMNT)) / 1000;
    const tickType =
      (i === 0 && 'main') || (i === tickMiddle && 'middle') || '';
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
export const Timeline = ({
  duration,
  zoom,
  timeSelected,
  collapsed,
  onCollapsedChange,
}) => {
  const segmentLength = Math.floor(1000 / zoom);
  const segmentsCount = duration ? Math.ceil(duration / segmentLength) : 10;
  const segments = Array(segmentsCount || 1).fill();
  return (
    <TimelineWrapper className={`${Classes.ELEVATION_1}`}>
      <Collapse collapsed={collapsed} onCollapsedChange={onCollapsedChange} />
      <TicksWrapper onClick={e => console.log(getEventRelativeCoords(e).x)}>
        {segments.map((_, i) =>
          renderSegment(i * segmentLength, segmentLength),
        )}
        <Timemarker offset={getOffsetFromTime(timeSelected)}>
          {timeSelected / 1000}s
        </Timemarker>
      </TicksWrapper>
    </TimelineWrapper>
  );
};
Timeline.propTypes = {
  duration: PropTypes.number,
  zoom: PropTypes.number,
  timeSelected: PropTypes.number,
  collapsed: PropTypes.bool,
  onCollapsedChange: PropTypes.func,
};
Timeline.defaultProps = {
  duration: 5000,
  zoom: 1,
  timeSelected: 0,
  collapsed: false,
  onCollapsedChange: () => {},
};
