import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Navbar,
  NavbarGroup,
  NavbarHeading,
  NavbarDivider,
  Alignment,
  Spinner,
} from '@blueprintjs/core';
import styled from '@emotion/styled';
import { mq } from '../../utils/mq';
import * as accStore from '../../store/modules/account';
import * as prjStore from '../../store/modules/project';
import * as htrStore from '../../store/modules/history';
import * as uiStore from '../../store/modules/ui';
import { ProjectMenu } from './ProjectMenu';
import { EditorMenu } from './EditorMenu';
import { SignIn } from './SignIn';
import { Account } from './Account';

const NavbarStyled = styled(Navbar)`
  ${mq.untilTablet} {
    padding: 0 0.5rem;
  }
`;

class RawHeader extends Component {
  componentDidMount = () => {
    const { actions } = this.props;
    actions.getCurrentAccount();
  };

  componentDidUpdate(prevProps) {
    const { account: prevAccount } = prevProps;
    const { account, actions } = this.props;
    if (account && (!prevAccount || prevAccount.uid !== account.uid)) {
      actions.getOwnProjects();
    }
  }

  render() {
    const {
      ui,
      account,
      currentProject,
      accountLoading,
      ownProjects,
      redoStack,
      undoStack,
      actions,
    } = this.props;
    return (
      <NavbarStyled>
        <NavbarGroup>
          <NavbarHeading>MUDE</NavbarHeading>
          <NavbarDivider />
          <ProjectMenu
            isAuthenticated={!!account}
            currentProject={currentProject}
            ownProjects={ownProjects}
            onNewProject={actions.newProject}
            onSaveProject={actions.saveProject}
            onOpenProject={actions.openProject}
          />
          <EditorMenu
            onRedo={actions.redo}
            onUndo={actions.undo}
            zoom={ui.zoom}
            redoStack={redoStack}
            undoStack={undoStack}
            onZoomIn={actions.zoomIn}
            onZoomOut={actions.zoomOut}
            onResetZoom={actions.resetZoom}
          />
        </NavbarGroup>
        <NavbarGroup align={Alignment.RIGHT}>
          {!!accountLoading && <Spinner size={Spinner.SIZE_SMALL} />}
          {!accountLoading &&
            (account ? (
              <Account {...account} onSignOut={actions.signOut} />
            ) : (
              <SignIn
                onSignInWithGoogle={actions.signInWithGoogle}
                onSignInWithEmail={actions.signInWithEmail}
                onSignUpWithEmail={actions.signUpWithEmail}
              />
            ))}
        </NavbarGroup>
      </NavbarStyled>
    );
  }
}

RawHeader.propTypes = {
  ui: PropTypes.object,
  account: PropTypes.object,
  accountLoading: PropTypes.bool,
  currentProject: PropTypes.object,
  ownProjects: PropTypes.arrayOf(PropTypes.object),
  actions: PropTypes.object,
};
RawHeader.defaultProps = {
  ui: {},
  account: undefined,
  currentProject: undefined,
  accountLoading: false,
  ownProjects: [],
  actions: {},
};
const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  ui: uiStore.getUi(state),
  account: accStore.getCurrentAccount(state).data,
  accountLoading: accStore.getCurrentAccount(state).loading,
  currentProject: prjStore.getCurrentProject(state).data,
  ownProjects: prjStore.getOwnProjects(state).data,
  undoStack: prjStore.getProjectUndoStack(state),
  redoStack: prjStore.getProjectRedoStack(state),
});
const mapDispatchToProps = dispatch => ({
  actions: {
    getCurrentAccount: () => dispatch(accStore.currentAccountAction()),
    signUpWithEmail: ({ email, password }) =>
      dispatch(accStore.signUpWithEmailAction({ email, password })),
    signInWithGoogle: () => dispatch(accStore.signInWithGoogleAction()),
    signInWithEmail: ({ email, password }) =>
      dispatch(accStore.signInWithEmailAction({ email, password })),
    signOut: () => dispatch(accStore.signOutAction()),
    getOwnProjects: () => dispatch(prjStore.ownProjectsAction()),
    openProject: id => dispatch(prjStore.openProjectAction(id)),
    newProject: () => dispatch(prjStore.newProjectAction()),
    saveProject: () => dispatch(prjStore.saveProjectAction()),
    undo: () => dispatch(htrStore.undoHistoryAction()),
    redo: () => dispatch(htrStore.redoHistoryAction()),
    zoomIn: () => dispatch(uiStore.zoomInAction()),
    zoomOut: () => dispatch(uiStore.zoomOutAction()),
    resetZoom: () => dispatch(uiStore.setZoomAction(1)),
  },
});
export const Header = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RawHeader);
