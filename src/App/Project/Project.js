import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Colors, NonIdealState, Button } from '@blueprintjs/core';
import { connect } from 'react-redux';
import { arrayMove } from 'react-sortable-hoc';
import { ProjectHeader } from './ProjectHeader';
import {
  CURRENT_PROJECT_KEY,
  updateProjectNameAction,
  addTrackAction,
  updateProjectTracksAction,
  updateTrackAction,
  openProjectAction,
  newProjectAction,
  selectTrackAction,
} from '../../store/modules/project';
import { TracksList } from './TracksList';
import { getSearchValue } from '../../utils/utils';
import { Timeline } from './Timeline';

const ProjectWrapper = styled.div`
  background-color: ${Colors.DARK_GRAY4};
  height: 100%;
`;
class RawProject extends React.Component {
  state = { collapsed: false };

  componentDidMount = () => this.checkRouteProject();

  componentDidUpdate = prevProps => this.checkRouteProject(prevProps);

  checkRouteProject = (prevProps = {}) => {
    const {
      location: { search },
      projectError,
      project,
      openProject,
      newProject,
    } = this.props;
    const {
      location: { search: prevSearch } = {},
      project: prevProject = {},
    } = prevProps;
    if (
      (projectError && projectError.code === 'PERMISSION_DENIED') ||
      (search === prevSearch && project === prevProject)
    ) {
      return null;
    }
    const routeProjectId = getSearchValue(search, 'project');
    if (routeProjectId && project && routeProjectId !== project.id) {
      return openProject(routeProjectId);
    }
    if (!routeProjectId && !!project.id) {
      return newProject();
    }
    return null;
  };

  renderError = () => {
    const { newProject } = this.props;
    return (
      <NonIdealState
        icon="path-search"
        title="Project not found"
        description="This project doesn't exist or you don't have permission to view it."
        action={<Button icon="plus" text="New project" onClick={newProject} />}
      />
    );
  };

  renderProjectContent = () => {
    const {
      project,
      projectLoading,
      updateProjectName,
      updateTracks,
      addTrack,
      selectTrack,
      updateTrack,
    } = this.props;
    const { collapsed } = this.state;
    return (
      <>
        <ProjectHeader
          title={project.name}
          loading={projectLoading}
          onTitleChange={updateProjectName}
          onAddTrack={addTrack}
        />
        <Timeline
          duration={project.duration}
          collapsed={collapsed}
          onCollapsedChange={value => this.setState({ collapsed: value })}
        />
        {project.tracks && project.tracks.length ? (
          <TracksList
            lockAxis="y"
            useDragHandle
            tracks={project.tracks}
            collapsed={collapsed}
            onSortEnd={({ oldIndex, newIndex }) =>
              updateTracks(arrayMove(project.tracks, oldIndex, newIndex))
            }
            selectedTrackId={project.selectedTrackId}
            onClickTrack={selectTrack}
            onChangeTrack={updateTrack}
          />
        ) : (
          <NonIdealState
            icon="document"
            title="Project is empty"
            description="Start adding tracks to your project."
            action={<Button icon="plus" text="Add track" onClick={addTrack} />}
          />
        )}
      </>
    );
  };

  render() {
    const { projectError, project } = this.props;
    return (
      <ProjectWrapper>
        {!project || (projectError && projectError.code === 'PERMISSION_DENIED')
          ? this.renderError()
          : this.renderProjectContent()}
      </ProjectWrapper>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  project: state[CURRENT_PROJECT_KEY].data,
  projectError: state[CURRENT_PROJECT_KEY].error,
  projectLoading: state[CURRENT_PROJECT_KEY].loading,
});
const mapDispatchToProps = dispatch => ({
  newProject: () => dispatch(newProjectAction()),
  openProject: id => dispatch(openProjectAction(id)),
  updateProjectName: name => dispatch(updateProjectNameAction(name)),
  updateTracks: tracks => dispatch(updateProjectTracksAction(tracks)),
  addTrack: () => dispatch(addTrackAction()),
  updateTrack: track => dispatch(updateTrackAction(track)),
  selectTrack: track => dispatch(selectTrackAction(track)),
});

export const Project = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RawProject);

RawProject.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  project: PropTypes.shape({
    name: PropTypes.string,
    tracks: PropTypes.array,
  }),
  projectError: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  projectLoading: PropTypes.bool,
  updateProjectName: PropTypes.func.isRequired,
  updateTracks: PropTypes.func.isRequired,
  addTrack: PropTypes.func.isRequired,
  updateTrack: PropTypes.func.isRequired,
  selectTrack: PropTypes.func.isRequired,
  openProject: PropTypes.func.isRequired,
  newProject: PropTypes.func.isRequired,
};
RawProject.defaultProps = {
  project: {},
  projectLoading: false,
  projectError: undefined,
  location: {},
};
