import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Colors, Classes } from '@blueprintjs/core';
import { Flex } from '../../../components/layout/Flex';
import { Timemarker } from '../../../components/utils/Timemarker';
import {
  getOffsetFromTime,
  getTimeFromOffset,
  renderTime,
} from '../../../utils/time';
import { TICK_WIDTH, TICKS_PER_SEGMENT } from '../../../utils/variables';
import { Collapse } from './Collapse';
import { getEventRelativeCoords } from '../../../utils/events';

const tickMiddle = Math.floor(TICKS_PER_SEGMENT / 2);
const segmentTicks = Array(TICKS_PER_SEGMENT).fill();

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
  cursor: pointer;
`;
const TicksWrapper = styled(Flex)`
  position: relative;
`;

const renderSegment = (start, length, zoom) =>
  segmentTicks.map((_, i) => {
    const tickValue = (start + i * (length / TICKS_PER_SEGMENT)) / 1000;
    const tickType =
      (i === 0 && 'main') || (i === tickMiddle && 'middle') || '';
    return (
      <Tick
        key={`${tickType}${tickValue}`}
        main={tickType === 'main' ? 1 : 0}
        middle={tickType === 'middle' ? 1 : 0}
      >
        {i === 0 && `${renderTime(start, zoom)}`}
      </Tick>
    );
  });
/**
 *
 * @prop {number} duration Indicates how many miliseconds has to be drawn
 * @prop {number} zoom Indicates how many segments are drawn for one second
 */
export class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
  }

  onClick = event => {
    const offset = getEventRelativeCoords(event, this.wrapperRef.current).x;
    const time = getTimeFromOffset(offset, this.props.zoom);
    if (!event.ctrlKey) {
      this.props.onClickTimeline(time);
    }
  };

  render() {
    const {
      duration,
      zoom,
      timeSelected,
      collapsed,
      onCollapsedChange,
    } = this.props;
    const segmentLength = 1000 / zoom;
    const segmentsCount = duration ? Math.ceil(duration / segmentLength) : 10;
    const segments = Array(segmentsCount || 1).fill();
    return (
      <TimelineWrapper
        className={`${Classes.ELEVATION_1}`}
        title="Play from here"
      >
        <Collapse collapsed={collapsed} onCollapsedChange={onCollapsedChange} />
        <TicksWrapper ref={this.wrapperRef} onClick={this.onClick}>
          {segments.map((_, i) =>
            renderSegment(i * segmentLength, segmentLength, zoom),
          )}
          <Timemarker offset={getOffsetFromTime(timeSelected, zoom)}>
            {renderTime(timeSelected, zoom, 2)}
          </Timemarker>
        </TicksWrapper>
      </TimelineWrapper>
    );
  }
}
Timeline.propTypes = {
  duration: PropTypes.number,
  zoom: PropTypes.number,
  timeSelected: PropTypes.number,
  collapsed: PropTypes.bool,
  onCollapsedChange: PropTypes.func,
  onClickTimeline: PropTypes.func,
};
Timeline.defaultProps = {
  duration: 10000,
  zoom: 1,
  timeSelected: 0,
  collapsed: false,
  onCollapsedChange: () => {},
  onClickTimeline: () => {},
};
