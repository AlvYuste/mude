import React, { Component } from 'react';
import { Classes } from '@blueprintjs/core';
import { Header } from './Header/Header';

class App extends Component {
  render() {
    return (
      <div className={Classes.DARK}>
        <Header />
      </div>
    );
  }
}

export default App;
