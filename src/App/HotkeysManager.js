import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { HotKeys } from 'react-hotkeys';
import { saveProjectAction, newProjectAction } from '../store/modules/project';
import { undoHistoryAction, redoHistoryAction } from '../store/modules/history';
import { prevent } from '../utils/utils';

export const RawHotkeysManager = ({
  saveProject,
  newProject,
  undo,
  redo,
  children,
  ...rest
}) => (
  <HotKeys
    {...rest}
    keyMap={{
      saveProject: ['command+s', 'ctrl+s'],
      newProject: ['command+o', 'ctrl+o'],
      undo: ['command+z', 'ctrl+z'],
      redo: ['command+y', 'ctrl+y', 'command+shift+z', 'ctrl+shift+z'],
    }}
    handlers={{
      saveProject: prevent(saveProject),
      newProject: prevent(newProject),
      undo: prevent(undo),
      redo: prevent(redo),
    }}
  >
    {children}
  </HotKeys>
);

RawHotkeysManager.propTypes = {
  saveProject: PropTypes.func.isRequired,
  newProject: PropTypes.func.isRequired,
  undo: PropTypes.func.isRequired,
  redo: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
RawHotkeysManager.defaultProps = {};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
});
const mapDispatchToProps = dispatch => ({
  saveProject: () => dispatch(saveProjectAction()),
  newProject: () => dispatch(newProjectAction()),
  undo: () => dispatch(undoHistoryAction()),
  redo: () => dispatch(redoHistoryAction()),
});
export const HotkeysManager = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RawHotkeysManager);
