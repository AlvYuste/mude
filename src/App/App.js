import React from 'react';
import { Classes } from '@blueprintjs/core';
import { Header } from './Header/Header';
import { withStore } from '../store/withStore';
import { ToastsManager } from './ToastsManager';
import { Project } from './Project/Project';
import { Body } from '../components/layout/Body';

const RawApp = () => (
  <Body className={Classes.DARK}>
    <Header />
    <Project />
    <ToastsManager />
  </Body>
);

export const App = withStore(RawApp);
