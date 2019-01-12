import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {
  EditableText,
  Colors,
  Icon,
  ButtonGroup,
  Button,
  Classes,
} from '@blueprintjs/core';
import { Flex } from '../../../components/layout/Flex';
import { SimpleSlider } from '../../../components/forms/SimpleSlider';
import { TRACK_HANDLE_WIDTH, TRACK_INFO_WIDTH } from '../../../utils/variables';
import { noPropagate } from '../../../utils/events';

const TrackInfoWrapper = styled(Flex)`
  background-color: ${Colors.DARK_GRAY5};
  padding: 0.5rem;
  position: sticky;
  left: ${TRACK_HANDLE_WIDTH};
  z-index: 5;
  transition: width ease 200ms, padding ease 200ms;
  width: ${({ collapsed }) => (collapsed ? 0 : TRACK_INFO_WIDTH)};
  padding: ${({ collapsed }) => (collapsed ? 0 : '')};
  & > * {
    pointer-events: ${({ collapsed }) => (collapsed ? 'none' : '')};
    opacity: ${({ collapsed }) => (collapsed ? 0 : 1)};
  }
`;
const TrackTitle = styled(EditableText)`
  margin-bottom: 0.5rem;
  transition: margin ease 200ms;
  opacity: 1;
  pointer-events: all;
  position: ${({ collapsed }) => (collapsed ? 'sticky' : 'relative')};
  min-width: calc(${TRACK_INFO_WIDTH} - 1rem);
  margin: ${({ collapsed }) => (collapsed ? '0.5rem' : '')};
`;
const SliderGroupStyled = styled(Flex)`
  transition: opacity ease 100ms;
  margin-top: ${({ collapsed }) => (collapsed ? '1.5rem' : '0')};
`;
const ButtonGroupStyled = styled(ButtonGroup)`
  justify-content: center;
  transition: opacity ease 100ms;
`;
const ButtonStyled = styled(Button)`
  text-transform: uppercase;
  font-size: 0.65rem;
`;
export class TrackInfo extends React.Component {
  shouldComponentUpdate = ({ track: trackNext, collapsed: collapsedNext }) =>
    trackNext !== this.props.track || collapsedNext !== this.props.collapsed;

  render() {
    const {
      track,
      collapsed,
      onChangeTrack,
      onChangeName,
      onChangeVolume,
      onChangePan,
    } = this.props;
    return (
      <TrackInfoWrapper
        collapsed={collapsed ? 1 : 0}
        className={`${Classes.ELEVATION_1}`}
        direction="column"
      >
        <TrackTitle
          value={track.name}
          collapsed={collapsed ? 1 : 0}
          selectAllOnFocus
          placeholder="(Untitled track)"
          onChange={onChangeName}
        />
        <SliderGroupStyled
          collapsed={collapsed ? 1 : 0}
          direction="column"
          style={{ padding: '0.5rem' }}
          onClick={noPropagate()}
        >
          <SimpleSlider
            maxLabel={<Icon iconSize={14} icon="volume-up" />}
            minLabel={<Icon iconSize={14} icon="volume-off" />}
            value={track.volume}
            onChange={onChangeVolume}
            tabIndex={collapsed ? -1 : ''}
          />
          <SimpleSlider
            min={-5}
            max={5}
            maxLabel="R"
            minLabel="L"
            showTrackFill={false}
            value={track.pan}
            onChange={onChangePan}
            tabIndex={collapsed ? -1 : ''}
          />
        </SliderGroupStyled>
        <ButtonGroupStyled>
          <ButtonStyled
            small
            text="mute"
            active={track.mute}
            onClick={noPropagate(() =>
              onChangeTrack({ ...track, mute: !track.mute }),
            )}
            tabIndex={collapsed ? -1 : ''}
          />
          <ButtonStyled
            small
            text="solo"
            active={track.solo}
            onClick={noPropagate(() =>
              onChangeTrack({ ...track, solo: !track.solo }),
            )}
            tabIndex={collapsed ? -1 : ''}
          />
        </ButtonGroupStyled>
      </TrackInfoWrapper>
    );
  }
}
TrackInfo.propTypes = {
  track: PropTypes.shape({
    name: PropTypes.string,
    volume: PropTypes.number,
    pan: PropTypes.number,
    mute: PropTypes.bool,
    solo: PropTypes.bool,
  }),
  collapsed: PropTypes.bool,
  onChangeTrack: PropTypes.func,
  onChangeName: PropTypes.func,
  onChangeVolume: PropTypes.func,
  onChangePan: PropTypes.func,
};

TrackInfo.defaultProps = {
  track: {
    name: '',
    volume: 5,
    pan: 0,
    mute: false,
    solo: false,
  },
  collapsed: false,
  onChangeTrack: () => {},
  onChangeName: () => {},
  onChangeVolume: () => {},
  onChangePan: () => {},
};
