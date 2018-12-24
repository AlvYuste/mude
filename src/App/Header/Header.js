import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Navbar,
  NavbarGroup,
  NavbarHeading,
  NavbarDivider,
  Button,
  Alignment,
} from '@blueprintjs/core';
import { Account } from './Account';
import { SignIn } from './SignIn';

export class Header extends Component {
  render() {
    const { currentUser } = this.props;
    return (
      <Navbar>
        <NavbarGroup>
          <NavbarHeading>MUDE</NavbarHeading>
          <NavbarDivider />
          <Button minimal icon="document" text="File" />
          <Button minimal icon="edit" text="Edit" />
        </NavbarGroup>
        <NavbarGroup align={Alignment.RIGHT}>
          {currentUser ? <Account /> : <SignIn />}
        </NavbarGroup>
      </Navbar>
    );
  }
}

Header.propTypes = {
  currentUser: PropTypes.object,
};
Header.defaultProps = {
  currentUser: undefined,
};
