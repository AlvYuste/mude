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
import { Account } from './Account';
import { SignIn } from './SignIn';
import {
  CURRENT_ACCOUNT_KEY,
  currentAccountAction,
  signInWithGoogleAction,
  signOutAction,
  signInWithEmailAction,
  signUpWithEmailAction,
} from '../../store/modules/account';
import { mq } from '../../utils/mq';
import { HeaderMenu } from './HeaderMenu';
import { saveProjectAction } from '../../store/modules/project';

const NavbarStyled = styled(Navbar)`
  padding: 0 0.5rem;
  ${mq.tablet} {
    padding: 0 1rem;
  }
`;

class RawHeader extends Component {
  componentDidMount = () => {
    const { getCurrentAccount } = this.props;
    getCurrentAccount();
  };

  render() {
    const {
      account,
      accountLoading,
      signInWithGoogle,
      signOut,
      signInWithEmail,
      signUpWithEmail,
      openNewProject,
      openProject,
      saveProject,
    } = this.props;
    return (
      <NavbarStyled>
        <NavbarGroup>
          <NavbarHeading>MUDE</NavbarHeading>
          <NavbarDivider />
          <HeaderMenu
            isAuthenticated={!!account}
            onNewProject={openNewProject}
            onOpenProject={openProject}
            onSaveProject={saveProject}
          />
        </NavbarGroup>
        <NavbarGroup align={Alignment.RIGHT}>
          {!!accountLoading && <Spinner size={Spinner.SIZE_SMALL} />}
          {!accountLoading &&
            (account ? (
              <Account {...account} onSignOut={signOut} />
            ) : (
              <SignIn
                onSignInWithGoogle={signInWithGoogle}
                onSignInWithEmail={signInWithEmail}
                onSignUpWithEmail={signUpWithEmail}
              />
            ))}
        </NavbarGroup>
      </NavbarStyled>
    );
  }
}

RawHeader.propTypes = {
  account: PropTypes.object,
  accountLoading: PropTypes.bool,
  getCurrentAccount: PropTypes.func.isRequired,
  signInWithGoogle: PropTypes.func.isRequired,
  signInWithEmail: PropTypes.func.isRequired,
  signUpWithEmail: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  openNewProject: PropTypes.func.isRequired,
  openProject: PropTypes.func.isRequired,
};
RawHeader.defaultProps = {
  account: undefined,
  accountLoading: false,
};
const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  account: state[CURRENT_ACCOUNT_KEY].data,
  accountLoading: state[CURRENT_ACCOUNT_KEY].loading,
});
const mapDispatchToProps = dispatch => ({
  getCurrentAccount: () => dispatch(currentAccountAction()),
  signUpWithEmail: ({ email, password }) =>
    dispatch(signUpWithEmailAction({ email, password })),
  signInWithGoogle: () => dispatch(signInWithGoogleAction()),
  signInWithEmail: ({ email, password }) =>
    dispatch(signInWithEmailAction({ email, password })),
  signOut: () => dispatch(signOutAction()),
  openNewProject: () => dispatch(openNewProjectAction()),
  openProject: id => dispatch(openProjectAction(id)),
  saveProject: () => dispatch(saveProjectAction()),
});
export const Header = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RawHeader);
