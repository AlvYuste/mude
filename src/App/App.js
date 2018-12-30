import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';
import { Classes } from '@blueprintjs/core';
import { Header } from './Header/Header';
import { withStore } from '../store/withStore';
import { ToastsManager } from './ToastsManager';
import { Project } from './Project/Project';
import { Body } from '../components/layout/Body';

const RawApp = () => (
  <Body className={Classes.DARK}>
    <Header />
    <BrowserRouter>
      <Route path="/" component={Project} />
    </BrowserRouter>
    <ToastsManager />
  </Body>
);

export const App = withStore(RawApp);
