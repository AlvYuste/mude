import React from 'react';
import { Router } from '@reach/router';
import styled from '@emotion/styled';
import { Classes, FocusStyleManager } from '@blueprintjs/core';
import { withStore } from '../store/withStore';
import { Body } from '../components/layout/Body';
import { Header } from './Header/Header';
import { Project } from './Project/Project';
import { ToastsManager } from './ToastsManager';
import { HotkeysManager } from './HotkeysManager';

FocusStyleManager.onlyShowFocusOnTabs();

const RouterStyled = styled(Router)`
  height: 100%;
`;
const HotkeysManagerStyled = styled(HotkeysManager)`
  height: 100%;
`;
const RawApp = () => (
  <HotkeysManagerStyled>
    <Body className={Classes.DARK}>
      <Header />
      <Body hasHeaders>
        <RouterStyled>
          <Project path="/" />
        </RouterStyled>
      </Body>
      <ToastsManager />
    </Body>
  </HotkeysManagerStyled>
);

export const App = withStore(RawApp);
