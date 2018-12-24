import React, { Component } from 'react';
import { Button, Popover } from '@blueprintjs/core';

export class Account extends Component {
  render() {
    return (
      <Popover content="Account">
        <Button icon="user" text="Account" />
      </Popover>
    );
  }
}
