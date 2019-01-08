import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Colors } from '@blueprintjs/core';
import { connect } from 'react-redux';
import { arrayMove } from 'react-sortable-hoc';

import * as projStore from '../../store/modules/project';
import * as uiStore from '../../store/modules/ui';
import { getSearchValue } from '../../utils/utils';
import { ProjectHeader } from './ProjectHeader';
import { TracksList } from './TracksList';
import { Timeline } from './Timeline/Timeline';
import { ProjectScroller } from './ProjectScroller';
import { ProjectEmpty } from './ProjectEmpty';
import { ProjectNotFound } from './ProjectNotFound';

const ProjectWrapper = styled.div`
  background-color: ${Colors.DARK_GRAY4};
  user-select: none;
  height: 100%;
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

  onTrackMoved = ({ oldIndex, newIndex }) => {
    const { project, updateTracks } = this.props;
    return oldIndex !== newIndex
      ? updateTracks(arrayMove(project.tracks, oldIndex, newIndex))
      : null;
  };

  render() {
    const { ui, project, projectLoading, addTrack, projectError } = this.props;
    const notFound =
      (!project && !projectLoading) ||
      (projectError && projectError.code === 'PERMISSION_DENIED');
    return (
      <ProjectWrapper>
        {notFound ? (
          <ProjectNotFound onAction={this.props.newProject} />
        ) : (
          <>
            <ProjectHeader
              title={project.name}
              loading={projectLoading}
              showRecord={ui.selectedTracks && ui.selectedTracks.length > 0}
              showPlay={project.duration > 0}
              showDelete={!!project.id}
              onTitleChange={this.props.updateProjectName}
              onAddTrack={this.props.addTrack}
              onDelete={this.props.deleteProject}
            />
            {project.tracks && project.tracks.length ? (
              <ProjectScroller>
                <Timeline
                  duration={project.duration}
                  timeSelected={ui.timeSelected}
                  collapsed={ui.collapsed}
                  zoom={ui.zoom}
                  onCollapsedChange={this.props.toggleCollapsed}
                />
                <TracksList
                  lockAxis="y"
                  useDragHandle
                  tracks={project.tracks}
                  collapsed={ui.collapsed}
                  onSortEnd={this.onTrackMoved}
                  selectedTracks={ui.selectedTracks}
                  onSelectTracks={this.props.selectTracks}
                />
              </ProjectScroller>
            ) : (
              !projectLoading && <ProjectEmpty onAction={addTrack} />
            )}
          </>
        )}
      </ProjectWrapper>
    );
  }
}
const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  project: projStore.getCurrentProject(state).data,
  projectError: projStore.getCurrentProject(state).error,
  projectLoading: projStore.getCurrentProject(state).loading,
  ui: state[uiStore.UI_KEY],
  selectedTracks: state[uiStore.UI_KEY].selectedTracks,
});
const mapDispatchToProps = dispatch => ({
  newProject: () => dispatch(projStore.newProjectAction()),
  openProject: id => dispatch(projStore.openProjectAction(id)),
  updateProjectName: name => dispatch(projStore.updateProjectNameAction(name)),
  updateTracks: tracks => dispatch(projStore.updateProjectTracksAction(tracks)),
  addTrack: () => dispatch(projStore.addTrackAction()),
  toggleCollapsed: () => dispatch(uiStore.toggleCollapsedAction()),
  deleteProject: () => dispatch(projStore.deleteProjectAction()),
  selectTracks: tracksIds => dispatch(uiStore.selectTracksAction(tracksIds)),
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
  ui: PropTypes.object,
  projectError: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  projectLoading: PropTypes.bool,
  updateProjectName: PropTypes.func.isRequired,
  updateTracks: PropTypes.func.isRequired,
  addTrack: PropTypes.func.isRequired,
  selectTracks: PropTypes.func.isRequired,
  openProject: PropTypes.func.isRequired,
  newProject: PropTypes.func.isRequired,
  toggleCollapsed: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
};
RawProject.defaultProps = {
  location: {},
  project: {},
  ui: {},
  projectLoading: false,
  projectError: undefined,
};
