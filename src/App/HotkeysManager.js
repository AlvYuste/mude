import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { HotKeys } from 'react-hotkeys';
import { saveProjectAction, newProjectAction } from '../store/modules/project';
import { undoHistoryAction, redoHistoryAction } from '../store/modules/history';
import { prevent } from '../utils/utils';
import { audioRecordAction } from '../store/modules/audio';

export const RawHotkeysManager = ({ actions, children, ...rest }) => (
  <HotKeys
    {...rest}
    keyMap={{
      saveProject: ['command+s', 'ctrl+s'],
      newProject: ['command+o', 'ctrl+o'],
      undo: ['command+z', 'ctrl+z'],
      redo: ['command+y', 'ctrl+y', 'command+shift+z', 'ctrl+shift+z'],
      record: ['command+space', 'ctrl+space'],
    }}
    handlers={{
      saveProject: prevent(actions.saveProject),
      newProject: prevent(actions.newProject),
      undo: prevent(actions.undo),
      redo: prevent(actions.redo),
      record: prevent(actions.record),
    }}
  >
    {children}
  </HotKeys>
);

RawHotkeysManager.propTypes = {
  actions: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};
RawHotkeysManager.defaultProps = {};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
});
const mapDispatchToProps = dispatch => ({
  actions: {
    saveProject: () => dispatch(saveProjectAction()),
    newProject: () => dispatch(newProjectAction()),
    undo: () => dispatch(undoHistoryAction()),
    redo: () => dispatch(redoHistoryAction()),
    record: () => dispatch(audioRecordAction()),
  },
});
export const HotkeysManager = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RawHotkeysManager);
