import React from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';
import {
  EditableText,
  Button,
  Intent,
  Spinner,
  Colors,
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
  ${mq.tablet} {
    background-color: unset;
    position: unset;
    box-shadow: unset;
    padding: 0;
    margin: 0;
  }
`;
export const ProjectHeader = ({
  title,
  loading,
  onTitleChange,
  onAddTrack,
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
      <Button large minimal title="Play" icon="play" intent={Intent.SUCCESS} />
      <Button
        large
        minimal
        title="Record"
        icon="record"
        intent={Intent.DANGER}
      />
      <Button
        large
        icon="plus"
        text="Track"
        title="Add track"
        onClick={onAddTrack}
      />
    </ProjectActions>
  </FlexResponsive>
);
ProjectHeader.propTypes = {
  title: PropTypes.string,
  loading: PropTypes.bool,
  onTitleChange: PropTypes.func,
  onAddTrack: PropTypes.func,
};
ProjectHeader.defaultProps = {
  title: '',
  loading: false,
  onTitleChange: () => {},
  onAddTrack: () => {},
};
