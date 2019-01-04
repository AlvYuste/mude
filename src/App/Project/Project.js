import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Colors, NonIdealState, Button, Classes } from '@blueprintjs/core';
import { connect } from 'react-redux';
import { arrayMove } from 'react-sortable-hoc';

import { CustomScroll } from '../../components/layout/CustomScroll';
import * as projStore from '../../store/modules/project';
import * as uiStore from '../../store/modules/ui';
import { getSearchValue } from '../../utils/utils';
import { ProjectHeader } from './ProjectHeader';
import { TracksList } from './TracksList';
import { Timeline } from './Timeline/Timeline';

const ProjectWrapper = styled.div`
  background-color: ${Colors.DARK_GRAY4};
  height: 100%;
`;
const ProjectContentWrapper = styled(CustomScroll)`
  background-color: ${Colors.DARK_GRAY5};
  overflow-x: auto;
  overflow-y: hidden;
`;
const ProjectContentInner = styled.div`
  display: inline-block;
  min-width: 100%;
`;
class RawProject extends React.Component {
  componentDidMount = () => {
    const { location, project, openProject } = this.props;
    const routeProjectId = getSearchValue(location.search, 'project');
    if (routeProjectId && project && routeProjectId !== project.id) {
      return openProject(routeProjectId);
    }
    return null;
  };

  renderNotFound = () => {
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

  renderEmpty = () => {
    const { addTrack } = this.props;
    return (
      <NonIdealState
        icon="document"
        title="Project empty"
        description="Start adding tracks to your project."
        action={<Button icon="plus" text="Add track" onClick={addTrack} />}
      />
    );
  };

  renderProjectContent = () => {
    const { collapsed, project, projectLoading, selectTrack } = this.props;
    return (
      <>
        <ProjectHeader
          title={project.name}
          loading={projectLoading}
          showRecord={!!project.selectedTrackId}
          showPlay={!!project.duration}
          showDelete={!!project.id}
          onTitleChange={this.props.updateProjectName}
          onAddTrack={this.props.addTrack}
          onDelete={this.props.deleteProject}
        />
        {project.tracks && project.tracks.length ? (
          <ProjectContentWrapper className={`${Classes.ELEVATION_1}`}>
            <ProjectContentInner>
              <Timeline
                duration={project.duration}
                collapsed={collapsed}
                onCollapsedChange={this.props.toggleCollapsed}
              />
              <TracksList
                lockAxis="y"
                useDragHandle
                tracks={project.tracks}
                collapsed={collapsed}
                onSortEnd={({ oldIndex, newIndex }) =>
                  oldIndex !== newIndex
                    ? this.props.updateTracks(
                        arrayMove(project.tracks, oldIndex, newIndex),
                      )
                    : null
                }
                selectedTrackId={project.selectedTrackId}
                onClickTrack={selectTrack}
              />
            </ProjectContentInner>
          </ProjectContentWrapper>
        ) : (
          !projectLoading && this.renderEmpty()
        )}
      </>
    );
  };

  render() {
    const { projectError, project, projectLoading } = this.props;
    return (
      <ProjectWrapper>
        {(!project && !projectLoading) ||
        (projectError && projectError.code === 'PERMISSION_DENIED')
          ? this.renderNotFound()
          : this.renderProjectContent()}
      </ProjectWrapper>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  project: state[projStore.CURRENT_PROJECT_KEY].data,
  projectError: state[projStore.CURRENT_PROJECT_KEY].error,
  projectLoading: state[projStore.CURRENT_PROJECT_KEY].loading,
  collapsed: state[uiStore.UI_KEY].collapsed,
});
const mapDispatchToProps = dispatch => ({
  newProject: () => dispatch(projStore.newProjectAction()),
  openProject: id => dispatch(projStore.openProjectAction(id)),
  updateProjectName: name => dispatch(projStore.updateProjectNameAction(name)),
  updateTracks: tracks => dispatch(projStore.updateProjectTracksAction(tracks)),
  addTrack: () => dispatch(projStore.addTrackAction()),
  selectTrack: track => dispatch(projStore.selectTrackAction(track)),
  toggleCollapsed: () => dispatch(uiStore.toggleCollapsedAction()),
  deleteProject: () => dispatch(projStore.deleteProjectAction()),
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
  selectTrack: PropTypes.func.isRequired,
  openProject: PropTypes.func.isRequired,
  newProject: PropTypes.func.isRequired,
  toggleCollapsed: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
};
RawProject.defaultProps = {
  project: {},
  projectLoading: false,
  projectError: undefined,
  collapsed: false,
  location: {},
};
