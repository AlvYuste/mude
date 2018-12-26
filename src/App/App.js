import React, { Component } from 'react';
import { Classes } from '@blueprintjs/core';
import { Header } from './Header/Header';
import { withStore } from '../store/withStore';
import { ErrorsDisplay } from './ErrorsDisplay';

class RawApp extends Component {
  render() {
    return (
      <div className={Classes.DARK}>
        <Header />
        <ErrorsDisplay />
      </div>
    );
  }
}

export const App = withStore(RawApp);
