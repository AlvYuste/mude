import React from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';
import { EditableText, Button, Intent, Spinner } from '@blueprintjs/core';
import { FlexResponsive, Flex } from '../../components/layout/Flex';

const ProjectTitle = styled(Flex)`
  font-size: 1.5rem;
  font-weight: 500;
  max-width: 50%;
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
    <FlexResponsive spaced="items">
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
    </FlexResponsive>
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
