import React from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { HotKeys } from 'react-hotkeys';
import { saveProjectAction, newProjectAction } from '../store/modules/project';
import { undoHistoryAction, redoHistoryAction } from '../store/modules/history';
import { prevent, preventInputs } from '../utils/events';
import { recordAction } from '../store/modules/recording';
import {
  zoomInAction,
  zoomOutAction,
  setZoomAction,
} from '../store/modules/ui';
import { stopAction, playAction, playingLens } from '../store/modules/playing';

export const RawHotkeysManager = ({ actions, children, playing, ...rest }) => (
  <HotKeys
    {...rest}
    onWheel={e =>
      e.ctrlKey &&
      prevent(() => (e.deltaY > 0 ? actions.zoomOut() : actions.zoomIn()))(e)
    }
    keyMap={{
      saveProject: ['command+s', 'ctrl+s'],
      newProject: ['command+o', 'ctrl+o'],
      undo: ['command+z', 'ctrl+z'],
      redo: ['command+y', 'ctrl+y', 'command+shift+z', 'ctrl+shift+z'],
      record: ['command+space', 'ctrl+space'],
      playStop: ['space'],
      zoomIn: ['command++', 'ctrl++'],
      zoomOut: ['command+-', 'ctrl+-'],
      resetZoom: ['command+0', 'ctrl+0'],
    }}
    handlers={{
      saveProject: prevent(actions.saveProject),
      newProject: prevent(actions.newProject),
      undo: actions.undo,
      redo: actions.redo,
      record: actions.record,
      playStop: preventInputs(() =>
        playing ? actions.stop() : actions.play(),
      ),
      zoomIn: prevent(actions.zoomIn),
      zoomOut: prevent(actions.zoomOut),
      resetZoom: actions.resetZoom,
    }}
  >
    {children}
  </HotKeys>
);

RawHotkeysManager.propTypes = {
  actions: PropTypes.object.isRequired,
  playing: PropTypes.bool,
  children: PropTypes.node.isRequired,
};
RawHotkeysManager.defaultProps = {
  playing: false,
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  playing: R.view(playingLens, state),
});
const mapDispatchToProps = dispatch => ({
  actions: {
    saveProject: () => dispatch(saveProjectAction()),
    newProject: () => dispatch(newProjectAction()),
    undo: () => dispatch(undoHistoryAction()),
    redo: () => dispatch(redoHistoryAction()),
    record: () => dispatch(recordAction()),
    play: () => dispatch(playAction()),
    stop: () => dispatch(stopAction()),
    zoomIn: () => dispatch(zoomInAction()),
    zoomOut: () => dispatch(zoomOutAction()),
    resetZoom: () => dispatch(setZoomAction(1)),
  },
});
export const HotkeysManager = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RawHotkeysManager);
