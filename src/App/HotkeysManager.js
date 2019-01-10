import React from 'react';
import * as R from 'ramda';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { HotKeys } from 'react-hotkeys';
import { saveProjectAction, newProjectAction } from '../store/modules/project';
import { undoHistoryAction, redoHistoryAction } from '../store/modules/history';
import { prevent } from '../utils/utils';
import { recordAction } from '../store/modules/audio';
import { stopAction, playAction, playingLens } from '../store/modules/ui';

function stopCallbackFixed(e, element) {
  if (`${element.className}`.indexOf(' mousetrap ') > -1) {
    return false;
  }
  return (
    element.tagName === 'INPUT' ||
    element.tagName === 'SELECT' ||
    element.tagName === 'TEXTAREA' ||
    (element.contentEditable && element.contentEditable === 'true')
  );
}
const overrideHotkeysMousetrap = ref => {
  if (ref) {
    // eslint-disable-next-line no-proto
    ref.__mousetrap__.__proto__.stopCallback = stopCallbackFixed;
  }
};

export const RawHotkeysManager = ({ actions, children, playing, ...rest }) => (
  <HotKeys
    {...rest}
    ref={overrideHotkeysMousetrap}
    keyMap={{
      saveProject: ['command+s', 'ctrl+s'],
      newProject: ['command+o', 'ctrl+o'],
      undo: ['command+z', 'ctrl+z'],
      redo: ['command+y', 'ctrl+y', 'command+shift+z', 'ctrl+shift+z'],
      record: ['command+space', 'ctrl+space'],
      playStop: ['space'],
    }}
    handlers={{
      saveProject: prevent(actions.saveProject),
      newProject: prevent(actions.newProject),
      undo: actions.undo,
      redo: actions.redo,
      record: actions.record,
      playStop: () => (playing ? actions.stop() : actions.play()),
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
  },
});
export const HotkeysManager = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RawHotkeysManager);
