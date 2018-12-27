import React from 'react';
import { Classes } from '@blueprintjs/core';
import { Header } from './Header/Header';
import { withStore } from '../store/withStore';
import { ErrorsDisplay } from './ErrorsDisplay';
import { Project } from './Project/Project';
import { Body } from '../components/layout/Body';

const RawApp = () => (
  <Body className={Classes.DARK}>
    <Header />
    <Project />
    <ErrorsDisplay />
  </Body>
);

export const App = withStore(RawApp);
