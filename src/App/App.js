import React from 'react';
import { Router } from '@reach/router';
import styled from '@emotion/styled';
import { Classes, FocusStyleManager } from '@blueprintjs/core';
import { Header } from './Header/Header';
import { withStore } from '../store/withStore';
import { ToastsManager } from './ToastsManager';
import { Project } from './Project/Project';
import { Body } from '../components/layout/Body';

FocusStyleManager.onlyShowFocusOnTabs();

const RouterStyled = styled(Router)`
  height: 100%;
`;
const RawApp = () => (
  <Body className={Classes.DARK}>
    <Header />
    <Body hasHeaders>
      <RouterStyled>
        <Project path="/" />
      </RouterStyled>
    </Body>
    <ToastsManager />
  </Body>
);

export const App = withStore(RawApp);
