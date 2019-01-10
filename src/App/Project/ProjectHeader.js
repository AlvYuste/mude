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
  showDelete,
  showPlay,
  onPlay,
  onRecord,
  onAddTrack,
  onDelete,
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
    {showDelete && (
      <Popover
        minimal
        content={
          <Menu>
            <MenuItem text="Delete project" icon="trash" onClick={onDelete} />
          </Menu>
        }
      >
        <Button minimal large icon="more" />
      </Popover>
    )}
  </>
);
export const ProjectHeader = props => (
  <FlexResponsive spaced align="center" justify="space-between">
    <ProjectTitle spaced="items">
      <EditableText
        placeholder="(Untitled project)"
        value={props.title}
        onChange={props.onTitleChange}
      />
      {props.loading && <Spinner size={Spinner.SIZE_SMALL} />}
    </ProjectTitle>
    <ProjectActions spaced="items">
      {(props.isRecording && (
        <ProjectRecordingActions onStop={props.onStop} />
      )) ||
        (props.isPlaying && (
          <ProjectPlayingActions onStop={props.onStop} />
        )) || (
          <ProjectDefaultActions
            onAddTrack={props.onAddTrack}
            showDelete={props.showDelete}
            showPlay={props.showPlay}
            onDelete={props.onDelete}
            onPlay={props.onPlay}
            onRecord={props.onRecord}
          />
        )}
    </ProjectActions>
  </FlexResponsive>
);
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
