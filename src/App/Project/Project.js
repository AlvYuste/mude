import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Colors, NonIdealState, Button } from '@blueprintjs/core';
import { connect } from 'react-redux';
import { arrayMove } from 'react-sortable-hoc';
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
import { getSearchValue } from '../../utils/utils';

import { ProjectHeader } from './ProjectHeader';
import { TracksList } from './TracksList';
import { Timeline } from './Timeline/Timeline';
import { UI_KEY, toggleCollapsedAction } from '../../store/modules/ui';

const ProjectWrapper = styled.div`
  background-color: ${Colors.DARK_GRAY4};
  height: 100%;
`;
class RawProject extends React.Component {
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
      collapsed,
      toggleCollapsed,
      project,
      projectLoading,
      updateProjectName,
      updateTracks,
      addTrack,
      selectTrack,
      updateTrack,
    } = this.props;
    return (
      <>
        <ProjectHeader
          title={project.name}
          loading={projectLoading}
          onTitleChange={updateProjectName}
          onAddTrack={addTrack}
        />
        {(project.tracks && project.tracks.length && (
          <>
            <Timeline
              duration={project.duration}
              collapsed={collapsed}
              onCollapsedChange={toggleCollapsed}
            />
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
          </>
        )) ||
          (!projectLoading && (
            <NonIdealState
              icon="document"
              title="Project is empty"
              description="Start adding tracks to your project."
              action={
                <Button icon="plus" text="Add track" onClick={addTrack} />
              }
            />
          ))}
      </>
    );
  };

  render() {
    const { projectError, project, projectLoading } = this.props;
    return (
      <ProjectWrapper>
        {(!project && !projectLoading) ||
        (projectError && projectError.code === 'PERMISSION_DENIED')
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
  collapsed: state[UI_KEY].collapsed,
});
const mapDispatchToProps = dispatch => ({
  newProject: () => dispatch(newProjectAction()),
  openProject: id => dispatch(openProjectAction(id)),
  updateProjectName: name => dispatch(updateProjectNameAction(name)),
  updateTracks: tracks => dispatch(updateProjectTracksAction(tracks)),
  addTrack: () => dispatch(addTrackAction()),
  updateTrack: track => dispatch(updateTrackAction(track)),
  selectTrack: track => dispatch(selectTrackAction(track)),
  toggleCollapsed: () => dispatch(toggleCollapsedAction()),
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
  collapsed: PropTypes.bool,
  projectError: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  projectLoading: PropTypes.bool,
  updateProjectName: PropTypes.func.isRequired,
  updateTracks: PropTypes.func.isRequired,
  addTrack: PropTypes.func.isRequired,
  updateTrack: PropTypes.func.isRequired,
  selectTrack: PropTypes.func.isRequired,
  openProject: PropTypes.func.isRequired,
  newProject: PropTypes.func.isRequired,
  toggleCollapsed: PropTypes.func.isRequired,
};
RawProject.defaultProps = {
  project: {},
  projectLoading: false,
  projectError: undefined,
  collapsed: false,
  location: {},
};
