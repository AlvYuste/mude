import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Colors } from '@blueprintjs/core';
import { connect } from 'react-redux';
import { arrayMove } from 'react-sortable-hoc';
import { Body } from '../../components/layout/Body';
import { ProjectHeader } from './ProjectHeader';
import {
  CURRENT_PROJECT_KEY,
  updateProjectNameAction,
  addTrackAction,
  updateProjectTracksAction,
  updateTrackAction,
} from '../../store/modules/project';
import { TracksList } from './TracksList';

const ProjectWrapper = styled(Body)`
  background-color: ${Colors.DARK_GRAY4};
`;
const RawProject = ({
  project,
  updateProjectName,
  updateTracks,
  addTrack,
  updateTrack,
}) => (
  <ProjectWrapper hasHeaders>
    <ProjectHeader
      title={project.name}
      onTitleChange={updateProjectName}
      onAddTrack={addTrack}
    />
    <TracksList
      lockAxis="y"
      useDragHandle
      tracks={project.tracks}
      onSortEnd={({ oldIndex, newIndex }) =>
        updateTracks(arrayMove(project.tracks, oldIndex, newIndex))
      }
      onChangeTrack={updateTrack}
    />
  </ProjectWrapper>
);

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  project: state[CURRENT_PROJECT_KEY].data,
  projectLoading: state[CURRENT_PROJECT_KEY].loading,
});
const mapDispatchToProps = dispatch => ({
  updateProjectName: name => dispatch(updateProjectNameAction(name)),
  updateTracks: tracks => dispatch(updateProjectTracksAction(tracks)),
  addTrack: () => dispatch(addTrackAction()),
  updateTrack: track => dispatch(updateTrackAction(track)),
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
  updateTracks: PropTypes.func.isRequired,
  addTrack: PropTypes.func.isRequired,
  updateTrack: PropTypes.func.isRequired,
};
RawProject.defaultProps = {
  project: {},
};
