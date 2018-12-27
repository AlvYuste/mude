import React from 'react';
import { omit } from 'ramda';
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
  background-color: ${Colors.DARK_GRAY5};
  padding: 0.5rem;
`;
const TrackTitle = styled(EditableText)`
  margin-bottom: 0.5rem;
`;
const ButtonGroupStyled = styled(ButtonGroup)`
  justify-content: center;
`;
const ButtonStyled = styled(Button)`
  font-variant: small-caps;
`;
export class TrackInfo extends React.Component {
  state = {
    track: this.props.track,
  };

  onChange = (prop, doSubmit) => value => {
    const { track } = this.state;
    this.setState({ track: { ...track, [prop]: value } }, () =>
      doSubmit ? this.onSubmit() : null,
    );
  };

  onSubmit = () => {
    const { track } = this.state;
    this.props.onChange(track);
  };

  render() {
    const { name: _, volume: _2, pan: _3, ...rest } = this.props;
    const {
      track: { name, volume, pan, mute, solo },
    } = this.state;
    return (
      <TrackInfoWrapper {...omit([], rest)} direction="column">
        <TrackTitle
          value={name}
          placeholder="(Untitled track)"
          onChange={this.onChange('name')}
          onConfirm={this.onSubmit}
        />
        <Flex direction="column" style={{ padding: '0.5rem' }}>
          <SimpleSlider
            maxLabel={<Icon iconSize={14} icon="volume-up" />}
            minLabel={<Icon iconSize={14} icon="volume-off" />}
            value={volume}
            onChange={this.onChange('volume')}
            onRelease={this.onSubmit}
          />
          <SimpleSlider
            min={-5}
            max={5}
            maxLabel="R"
            minLabel="L"
            showTrackFill={false}
            value={pan}
            onChange={this.onChange('pan')}
            onRelease={this.onSubmit}
          />
        </Flex>
        <ButtonGroupStyled>
          <ButtonStyled
            small
            text="mute"
            active={mute}
            onClick={() => this.onChange('mute', true)(!mute)}
          />
          <ButtonStyled
            small
            text="solo"
            active={solo}
            onClick={() => this.onChange('solo', true)(!solo)}
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
  onChange: PropTypes.func,
};

TrackInfo.defaultProps = {
  track: {
    name: '',
    volume: 5,
    pan: 0,
    mute: false,
    solo: false,
  },
  onChange: console.log,
};
