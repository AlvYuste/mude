import React, { Component } from 'react';
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

const SignInFormWrapper = styled(Flex)`
  width: 20rem;
`;
export class SignIn extends Component {
  state = {
    email: '',
    password: '',
    showPassword: false,
  };

  onTogglePassword = () => {
    const { showPassword } = this.state;
    this.setState({
      showPassword: !showPassword,
    });
  };

  onInputChange = ({ target }) =>
    this.setState({ [target.name]: target.value });

  onSubmit = () => {
    const { email, password } = this.state;
    console.log(email, password);
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
    const { email, password, showPassword } = this.state;
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
            <Button fill text="Create account" />
            <Button fill type="submit" intent={Intent.PRIMARY} text="Sign in" />
          </Flex>
          <Divider />
          <p>Or with other account:</p>
          <Button
            type="button"
            text="Sign in with Google"
            icon={<ImgIcon src={googleLogo} alt="Google logo" />}
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
