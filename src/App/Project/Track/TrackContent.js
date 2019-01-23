import React from 'react';
import PropTypes from 'prop-types';

import { Colors } from '@blueprintjs/core';
import styled from '@emotion/styled';
import { getOffsetFromTime, getTimeFromOffset } from '../../../utils/time';
import { Timemarker } from '../../../components/utils/Timemarker';
import { getEventRelativeCoords } from '../../../utils/events';
import { Clip } from '../Clip/Clip';

const TrackContentWrapper = styled.div`
  background-color: ${Colors.DARK_GRAY1};
  border-bottom: 1px solid ${Colors.DARK_GRAY5};
  position: relative;
  cursor: crosshair;
  flex: 1;
`;

export class TrackContent extends React.Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
  }

  onClick = event => {
    const offset = getEventRelativeCoords(event, this.wrapperRef.current).x;
    const time = getTimeFromOffset(offset, this.props.zoom);
    if (!event.ctrlKey) {
      this.props.onSelectTime(time);
    }
  };

  render() {
    const { track, isSelected, timeSelected, zoom } = this.props;
    return (
      <TrackContentWrapper ref={this.wrapperRef} onClick={this.onClick}>
        <Timemarker
          offset={getOffsetFromTime(timeSelected || 0, zoom)}
          color={isSelected ? Colors.BLUE5 : Colors.DARK_GRAY5}
        />
        {track.clips &&
          track.clips.map(clip => <Clip key={clip.id} {...clip} />)}
      </TrackContentWrapper>
    );
  }
}
TrackContent.propTypes = {
  track: PropTypes.object,
  zoom: PropTypes.number,
  timeSelected: PropTypes.number,
  isSelected: PropTypes.bool,
  onSelectTime: PropTypes.func,
};
TrackContent.defaultProps = {
  track: {},
  zoom: 1,
  timeSelected: 0,
  isSelected: false,
  onSelectTime: () => {},
};
