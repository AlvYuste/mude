import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {
  EditableText,
  Colors,
  Icon,
  ButtonGroup,
  Button,
} from '@blueprintjs/core';
import { Flex } from '../../../components/layout/Flex';
import { SimpleSlider } from '../../../components/forms/SimpleSlider';

const TrackInfoWrapper = styled(Flex)`
  background-color: ${({ isSelected }) =>
    isSelected ? Colors.DARK_GRAY5 : Colors.DARK_GRAY4};
  padding: 0.5rem;
`;
const TrackTitle = styled(EditableText)`
  margin-bottom: 0.5rem;
`;
const ButtonGroupStyled = styled(ButtonGroup)`
  justify-content: center;
`;
const ButtonStyled = styled(Button)`
  text-transform: uppercase;
  font-size: 0.65rem;
`;
export class TrackInfo extends React.Component {
  state = {
    track: this.props.track,
  };

  onChangeState = (prop, doSubmit) => value => {
    const { track } = this.state;
    this.setState({ track: { ...track, [prop]: value } }, () =>
      doSubmit ? this.onSubmit() : null,
    );
  };

  onSubmit = () => {
    const { track } = this.state;
    this.props.onChangeTrack(track);
  };

  render() {
    const {
      track: { name, volume, pan, mute, solo },
    } = this.state;
    const { track, onChangeTrack, ...rest } = this.props;
    return (
      <TrackInfoWrapper {...rest} direction="column">
        <TrackTitle
          value={name}
          placeholder="(Untitled track)"
          onChange={this.onChangeState('name')}
          onConfirm={this.onSubmit}
        />
        <Flex direction="column" style={{ padding: '0.5rem' }}>
          <SimpleSlider
            maxLabel={<Icon iconSize={14} icon="volume-up" />}
            minLabel={<Icon iconSize={14} icon="volume-off" />}
            value={volume}
            onChange={this.onChangeState('volume')}
            onRelease={this.onSubmit}
          />
          <SimpleSlider
            min={-5}
            max={5}
            maxLabel="R"
            minLabel="L"
            showTrackFill={false}
            value={pan}
            onChange={this.onChangeState('pan')}
            onRelease={this.onSubmit}
          />
        </Flex>
        <ButtonGroupStyled>
          <ButtonStyled
            small
            text="mute"
            active={mute}
            onClick={() => this.onChangeState('mute', true)(!mute)}
          />
          <ButtonStyled
            small
            text="solo"
            active={solo}
            onClick={() => this.onChangeState('solo', true)(!solo)}
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
  isSelected: PropTypes.bool,
  onChangeTrack: PropTypes.func,
};

TrackInfo.defaultProps = {
  track: {
    name: '',
    volume: 5,
    pan: 0,
    mute: false,
    solo: false,
  },
  isSelected: false,
  onChangeTrack: () => {},
};
