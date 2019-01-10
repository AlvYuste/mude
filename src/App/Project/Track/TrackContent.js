import React from 'react';
import PropTypes from 'prop-types';

import { Colors } from '@blueprintjs/core';
import styled from '@emotion/styled';
// import { Clip } from '../Clip/Clip';
import {
  getEventRelativeCoords,
  getOffsetFromTime,
  getTimeFromOffset,
} from '../../../utils/utils';
import { Timemarker } from '../../../components/utils/Timemarker';

const TrackContentWrapper = styled.div`
  background-color: ${Colors.DARK_GRAY1};
  border-bottom: 1px solid ${Colors.DARK_GRAY5};
  position: relative;
  cursor: crosshair;
`;

export class TrackContent extends React.Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
  }

  onClick = event => {
    const offset = getEventRelativeCoords(event, this.wrapperRef.current).x;
    const time = getTimeFromOffset(offset);
    if (!event.ctrlKey) {
      this.props.onSelectTime(time);
    }
  };

  render() {
    const { onSelectTime, isSelected, timeSelected, ...rest } = this.props;
    return (
      <TrackContentWrapper
        {...rest}
        ref={this.wrapperRef}
        onClick={this.onClick}
      >
        <Timemarker
          offset={getOffsetFromTime(timeSelected || 0)}
          color={isSelected ? Colors.BLUE5 : Colors.DARK_GRAY5}
        />
        {/* <Clip startAt={1000} endAt={5000} /> */}
      </TrackContentWrapper>
    );
  }
}

TrackContent.propTypes = {
  onSelectTime: PropTypes.func,
  timeSelected: PropTypes.number,
  isSelected: PropTypes.bool,
};
TrackContent.defaultProps = {
  onSelectTime: () => {},
  timeSelected: 0,
  isSelected: false,
};
