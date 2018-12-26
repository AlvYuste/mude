import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  InputGroup,
  Popover,
  Intent,
  Divider,
} from '@blueprintjs/core';
import styled from '@emotion/styled';

import googleLogo from '../../../assets/google.svg';
import { Flex } from '../../components/layout/Flex';
import { ImgIcon } from '../../components/utils/ImgIcon';
import { prevent } from '../../utils/utils';

const SIGNIN = 'signin';
const SIGNUP = 'signup';

const SignInFormWrapper = styled(Flex)`
  width: 20rem;
`;
export class SignIn extends Component {
  state = {
    email: '',
    password: '',
    action: SIGNIN,
    showPassword: false,
  };

  onTogglePassword = () => {
    const { showPassword } = this.state;
    this.setState({
      showPassword: !showPassword,
    });
  };

  onToggleAction = () => {
    const { action } = this.state;
    this.setState({
      action: action === SIGNIN ? SIGNUP : SIGNIN,
    });
  };

  onInputChange = ({ target }) =>
    this.setState({ [target.name]: target.value });

  onSubmit = () => {
    const { email, password, action } = this.state;
    const { onSignInWithEmail, onSignUpWithEmail } = this.props;
    return action === SIGNIN
      ? onSignInWithEmail({ email, password })
      : onSignUpWithEmail({ email, password });
  };

  renderPasswordToggleButton = () => {
    const { showPassword } = this.state;
    return (
      <Button
        minimal
        title={`${showPassword ? 'Hide' : 'Show'} Password`}
        icon={showPassword ? 'unlock' : 'lock'}
        intent={Intent.WARNING}
        onClick={this.onTogglePassword}
      />
    );
  };

  renderSignInForm = () => {
    const { onSignInWithGoogle } = this.props;
    const { email, password, showPassword, action } = this.state;
    return (
      <form onSubmit={prevent(this.onSubmit)}>
        <SignInFormWrapper spaced direction="column">
          <p>Sign in with your email:</p>
          <InputGroup
            required
            type="email"
            name="email"
            placeholder="Email"
            onChange={this.onInputChange}
            value={email || ''}
          />
          <InputGroup
            required
            name="password"
            minLength="8"
            placeholder="Password"
            rightElement={
              password && password.length
                ? this.renderPasswordToggleButton()
                : ''
            }
            onChange={this.onInputChange}
            type={showPassword ? 'text' : 'password'}
            value={password || ''}
          />
          <Flex spaced="items">
            <Button
              fill
              small
              minimal
              intent={Intent.PRIMARY}
              text={action === SIGNIN ? 'Create account' : 'I have an account'}
              onClick={this.onToggleAction}
            />
            <Button
              fill
              type="submit"
              intent={Intent.PRIMARY}
              text={action === SIGNIN ? 'Sign in' : 'Create account'}
            />
          </Flex>
          <Divider />
          <p>Or with other account:</p>
          <Button
            type="button"
            text="Sign in with Google"
            icon={<ImgIcon src={googleLogo} alt="Google logo" />}
            onClick={onSignInWithGoogle}
          />
        </SignInFormWrapper>
      </form>
    );
  };

  render() {
    return (
      <Popover content={this.renderSignInForm()}>
        <Button icon="user" text="Sign in" />
      </Popover>
    );
  }
}

SignIn.propTypes = {
  onSignInWithGoogle: PropTypes.func,
  onSignInWithEmail: PropTypes.func,
  onSignUpWithEmail: PropTypes.func,
};

SignIn.defaultProps = {
  onSignInWithGoogle: () => {},
  onSignInWithEmail: () => {},
  onSignUpWithEmail: () => {},
};
