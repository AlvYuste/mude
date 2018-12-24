import React from 'react';
import {
  Navbar,
  NavbarGroup,
  NavbarHeading,
  NavbarDivider,
  Button,
  Alignment,
} from '@blueprintjs/core';
import { Account } from './Account';

export const Header = () => (
  <Navbar>
    <NavbarGroup>
      <NavbarHeading>MUDE</NavbarHeading>
      <NavbarDivider />
      <Button minimal icon="document" text="File" />
      <Button minimal icon="edit" text="Edit" />
    </NavbarGroup>
    <NavbarGroup align={Alignment.RIGHT}>
      <Account />
    </NavbarGroup>
  </Navbar>
);
