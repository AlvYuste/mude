import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Colors } from '@blueprintjs/core';
import { connect } from 'react-redux';
import { arrayMove } from 'react-sortable-hoc';

import * as projStore from '../../store/modules/project';
import * as uiStore from '../../store/modules/ui';
import * as audioStore from '../../store/modules/audio';
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
    const { location, project, actions } = this.props;
    const routeProjectId = getSearchValue(location.search, 'project');
    if (routeProjectId && project && routeProjectId !== project.id) {
      return actions.openProject(routeProjectId);
    }
    return null;
  };

  onTrackMoved = ({ oldIndex, newIndex }) => {
    const { project, actions } = this.props;
    return oldIndex !== newIndex
      ? actions.setTracks(arrayMove(project.tracks, oldIndex, newIndex))
      : null;
  };

  render() {
    const { ui, project, projectLoading, actions, projectError } = this.props;
    const hasTracks = project.tracks && project.tracks.length;
    const notFound =
      (!project && !projectLoading) ||
      (projectError && projectError.code === 'PERMISSION_DENIED');
    return (
      <ProjectWrapper>
        {notFound ? (
          <ProjectNotFound onAction={actions.newProject} />
        ) : (
          <>
            <ProjectHeader
              title={project.name}
              loading={projectLoading}
              showDelete={!!project.id}
              showPlay={!!hasTracks}
              isRecording={ui.recording}
              isPlaying={ui.playing}
              onTitleChange={value => actions.setProjectName(value)}
              onAddTrack={() => actions.addTrack()}
              onDelete={() => actions.deleteProject()}
              onRecord={() => actions.record()}
              onPlay={() => actions.play()}
              onStop={() => actions.stop()}
            />
            {hasTracks ? (
              <ProjectScroller>
                <Timeline
                  duration={
                    Math.max(project.duration || 0, ui.timeSelected || 0) +
                    10000 / ui.zoom
                  }
                  timeSelected={ui.timeSelected}
                  collapsed={ui.collapsed}
                  zoom={ui.zoom}
                  onCollapsedChange={() => actions.toggleCollapsed()}
                  onClickTimeline={time => actions.play(time)}
                />
                <TracksList
                  lockAxis="y"
                  useDragHandle
                  tracks={project.tracks}
                  onSortEnd={this.onTrackMoved}
                  selectedTracks={ui.selectedTracks}
                  onSelectTracks={tracksIds => actions.selectTracks(tracksIds)}
                />
              </ProjectScroller>
            ) : (
              !projectLoading && (
                <ProjectEmpty
                  onAddTrack={() => actions.addTrack()}
                  onRecord={() => actions.record()}
                />
              )
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
});
const mapDispatchToProps = dispatch => ({
  actions: {
    newProject: () => dispatch(projStore.newProjectAction()),
    openProject: id => dispatch(projStore.openProjectAction(id)),
    setProjectName: name => dispatch(projStore.setProjectNameAction(name)),
    setTracks: tracks => dispatch(projStore.setProjectTracksAction(tracks)),
    addTrack: () => dispatch(projStore.addTrackAction()),
    toggleCollapsed: () => dispatch(uiStore.toggleCollapsedAction()),
    deleteProject: () => dispatch(projStore.deleteProjectAction()),
    selectTracks: tracksIds => dispatch(uiStore.selectTracksAction(tracksIds)),
    record: () => dispatch(audioStore.recordAction()),
    play: time => dispatch(uiStore.playAction(time)),
    stop: () => dispatch(uiStore.stopAction()),
  },
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
  actions: PropTypes.object,
};
RawProject.defaultProps = {
  location: {},
  project: {},
  ui: {},
  projectLoading: false,
  projectError: undefined,
  actions: {},
};
