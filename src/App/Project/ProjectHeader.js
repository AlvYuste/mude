/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';
import {
  EditableText,
  Button,
  Intent,
  Spinner,
  Popover,
  Menu,
  MenuItem,
  Classes,
  Tag,
  Position,
} from '@blueprintjs/core';
import { FlexResponsive, Flex } from '../../components/layout/Flex';
import { mq } from '../../utils/mq';

const ProjectTitle = styled(Flex)`
  font-size: 1.5rem;
  font-weight: 500;
`;
const ProjectActions = styled(FlexResponsive)`
  background-color: unset;
  position: unset;
  box-shadow: unset;
  padding: 0;
  margin: 0;
  z-index: 0;

  ${mq.untilTablet} {
    .${Classes.BUTTON_TEXT} {
      display: none;
    }
    .${Classes.ICON} {
      margin: 0;
    }
  }
`;
export const ProjectRecordingActions = ({ onStop }) => (
  <>
    <Tag minimal intent={Intent.DANGER} large icon="record">
      Recording...
    </Tag>
    <Button large icon="stop" onClick={onStop} />
  </>
);
export const ProjectPlayingActions = ({ onStop }) => (
  <>
    <Tag minimal intent={Intent.SUCCESS} large icon="play">
      Playing...
    </Tag>
    <Button large icon="stop" onClick={onStop} />
  </>
);
export const ProjectDefaultActions = ({
  showPlay,
  onPlay,
  onRecord,
  onAddTrack,
}) => (
  <>
    {showPlay && (
      <Button
        large
        minimal
        title="Play (Space)"
        icon="play"
        intent={Intent.SUCCESS}
        onClick={onPlay}
      />
    )}
    <Button
      large
      minimal
      title="Record (Ctrl+Space)"
      icon="record"
      intent={Intent.DANGER}
      onClick={onRecord}
    />
    <Button
      large
      icon="plus"
      text="Track"
      title="Add track"
      onClick={onAddTrack}
    />
  </>
);
const ProjectOptions = ({ showDelete, onDelete }) => {
  const options = [];
  if (showDelete) {
    options.push(
      <MenuItem
        key="delete"
        text="Delete project"
        icon="trash"
        onClick={onDelete}
      />,
    );
  }
  return options.length ? (
    <Popover
      minimal
      position={Position.BOTTOM_LEFT}
      content={<Menu>{options}</Menu>}
    >
      <Button minimal large icon="more" />
    </Popover>
  ) : (
    ''
  );
};
export class ProjectHeader extends React.Component {
  shouldComponentUpdate = nextProps =>
    this.props.title !== nextProps.title ||
    this.props.showDelete !== nextProps.showDelete ||
    this.props.showPlay !== nextProps.showPlay ||
    this.props.isRecording !== nextProps.isRecording ||
    this.props.isPlaying !== nextProps.isPlaying ||
    this.props.loading !== nextProps.loading;

  render = () => (
    <FlexResponsive spaced align="center" justify="space-between">
      <ProjectTitle spaced="items">
        <EditableText
          placeholder="(Untitled project)"
          value={this.props.title}
          onChange={this.props.onTitleChange}
        />
        {this.props.loading && <Spinner size={Spinner.SIZE_SMALL} />}
      </ProjectTitle>
      <ProjectActions spaced="items">
        {this.props.isRecording && (
          <ProjectRecordingActions onStop={this.props.onStop} />
        )}
        {this.props.isPlaying && !this.props.isRecording && (
          <ProjectPlayingActions onStop={this.props.onStop} />
        )}
        {!this.props.isPlaying && !this.props.isRecording && (
          <ProjectDefaultActions {...this.props} />
        )}
        <ProjectOptions {...this.props} />
      </ProjectActions>
    </FlexResponsive>
  );
}
ProjectHeader.propTypes = {
  title: PropTypes.string,
  showDelete: PropTypes.bool,
  showPlay: PropTypes.bool,
  isRecording: PropTypes.bool,
  isPlaying: PropTypes.bool,
  loading: PropTypes.bool,

  onTitleChange: PropTypes.func,
  onAddTrack: PropTypes.func,
  onDelete: PropTypes.func,
  onPlay: PropTypes.func,
  onRecord: PropTypes.func,
  onStop: PropTypes.func,
};
ProjectHeader.defaultProps = {
  title: '',
  showDelete: false,
  showPlay: false,
  loading: false,
  isRecording: false,
  isPlaying: false,
  onTitleChange: () => {},
  onAddTrack: () => {},
  onDelete: () => {},
  onPlay: () => {},
  onRecord: () => {},
  onStop: () => {},
};
