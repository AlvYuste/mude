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
export const ProjectHeader = ({
  title,
  loading,
  onTitleChange,
  onAddTrack,
  showPlay,
  showRecord,
  showDelete,
  onDelete,
  onPlay,
  onRecord,
}) => (
  <FlexResponsive spaced align="center" justify="space-between">
    <ProjectTitle spaced="items">
      <EditableText
        placeholder="(Untitled project)"
        value={title}
        onChange={onTitleChange}
      />
      {loading && <Spinner size={Spinner.SIZE_SMALL} />}
    </ProjectTitle>
    <ProjectActions spaced="items">
      {showPlay && (
        <Button
          large
          minimal
          title="Play"
          icon="play"
          intent={Intent.SUCCESS}
          onClick={onPlay}
        />
      )}
      {showRecord && (
        <Button
          large
          minimal
          title="Record"
          icon="record"
          intent={Intent.DANGER}
          onClick={onRecord}
        />
      )}
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
    </ProjectActions>
  </FlexResponsive>
);
ProjectHeader.propTypes = {
  title: PropTypes.string,
  showPlay: PropTypes.bool,
  showRecord: PropTypes.bool,
  showDelete: PropTypes.bool,
  loading: PropTypes.bool,
  onTitleChange: PropTypes.func,
  onAddTrack: PropTypes.func,
  onDelete: PropTypes.func,
  onPlay: PropTypes.func,
  onRecord: PropTypes.func,
};
ProjectHeader.defaultProps = {
  title: '',
  showPlay: false,
  showRecord: false,
  showDelete: false,
  loading: false,
  onTitleChange: () => {},
  onAddTrack: () => {},
  onDelete: () => {},
  onPlay: () => {},
  onRecord: () => {},
};
