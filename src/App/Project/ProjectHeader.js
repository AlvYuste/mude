import React from 'react';
import PropTypes from 'prop-types';

import styled from '@emotion/styled';
import { EditableText, Button, Intent } from '@blueprintjs/core';
import { FlexResponsive } from '../../components/layout/Flex';

const ProjectTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  max-width: 50%;
`;
export class ProjectHeader extends React.Component {
  state = {
    title: this.props.title,
  };

  render() {
    const { title } = this.state;
    const { onTitleChange, onAddTrack } = this.props;
    return (
      <FlexResponsive spaced align="center" justify="space-between">
        <ProjectTitle>
          <EditableText
            placeholder="(Untitled project)"
            value={title}
            onChange={value => this.setState({ title: value })}
            onConfirm={onTitleChange}
          />
        </ProjectTitle>
        <FlexResponsive spaced="items">
          <Button
            large
            minimal
            title="Play"
            icon="play"
            intent={Intent.SUCCESS}
          />
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
  }
}
ProjectHeader.propTypes = {
  title: PropTypes.string,
  onTitleChange: PropTypes.func,
  onAddTrack: PropTypes.func,
};
ProjectHeader.defaultProps = {
  title: '',
  onTitleChange: () => {},
  onAddTrack: () => {},
};
