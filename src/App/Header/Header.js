import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Navbar,
  NavbarGroup,
  NavbarHeading,
  NavbarDivider,
  Button,
  Alignment,
  Spinner,
} from '@blueprintjs/core';
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
    } = this.props;
    return (
      <Navbar>
        <NavbarGroup>
          <NavbarHeading>MUDE</NavbarHeading>
          <NavbarDivider />
          <Button minimal icon="document" text="File" />
          <Button minimal icon="edit" text="Edit" />
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
      </Navbar>
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
});
export const Header = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RawHeader);
