import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './configureStore';

const store = configureStore();

export const withStore = TargetComponent =>
  class WithStore extends Component {
    render() {
      return (
        <Provider store={store}>
          <TargetComponent {...this.props} />
        </Provider>
      );
    }
  };
