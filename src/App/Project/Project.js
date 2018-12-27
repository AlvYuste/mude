import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Colors } from '@blueprintjs/core';
import { connect } from 'react-redux';
import { Body } from '../../components/layout/Body';
import { ProjectHeader } from './ProjectHeader';
import {
  CURRENT_PROJECT_KEY,
  updateProjectNameAction,
  addTrackAction,
} from '../../store/modules/project';
import { Track } from './Track/Track';
import { FlexResponsive } from '../../components/layout/Flex';

const ProjectWrapper = styled(Body)`
  background-color: ${Colors.DARK_GRAY4};
`;
const RawProject = ({ project, updateProjectName, addTrack }) => (
  <ProjectWrapper hasHeaders>
    <ProjectHeader
      title={project.name}
      onTitleChange={updateProjectName}
      onAddTrack={addTrack}
    />
    <FlexResponsive direction="column" spaced>
      {!!project.tracks &&
        project.tracks.map(track => <Track key={track.id} track={track} />)}
    </FlexResponsive>
  </ProjectWrapper>
);

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  project: state[CURRENT_PROJECT_KEY].data,
  projectLoading: state[CURRENT_PROJECT_KEY].loading,
});
const mapDispatchToProps = dispatch => ({
  updateProjectName: name => dispatch(updateProjectNameAction(name)),
  addTrack: () => dispatch(addTrackAction()),
});

export const Project = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RawProject);

RawProject.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string,
    tracks: PropTypes.array,
  }),
  updateProjectName: PropTypes.func.isRequired,
  addTrack: PropTypes.func.isRequired,
};
RawProject.defaultProps = {
  project: {},
};
