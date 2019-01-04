import React from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';
import {
  EditableText,
  Button,
  Intent,
  Spinner,
  Colors,
  Popover,
  Menu,
  MenuItem,
} from '@blueprintjs/core';
import { FlexResponsive, Flex } from '../../components/layout/Flex';
import { mq } from '../../utils/mq';

const ProjectTitle = styled(Flex)`
  font-size: 1.5rem;
  font-weight: 500;
  max-width: 100%;
  ${mq.tablet} {
    max-width: 50%;
  }
`;
const ProjectActions = styled(FlexResponsive)`
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 0.5rem;
  margin: 0;
  justify-content: flex-end;
  background-color: ${Colors.DARK_GRAY5};
  box-shadow: 0 0 0 1px ${Colors.DARK_GRAY3};
  z-index: 10;
  ${mq.tablet} {
    background-color: unset;
    position: unset;
    box-shadow: unset;
    padding: 0;
    margin: 0;
    z-index: 0;
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
