import React from 'react';
import styled from '@emotion/styled';
import { Colors, Classes } from '@blueprintjs/core';
import { CustomScroll } from '../../components/layout/CustomScroll';

const ProjectScrollerWrapper = styled(CustomScroll)`
  background-color: ${Colors.DARK_GRAY5};
  overflow-x: auto;
  overflow-y: hidden;
`;
const ProjectScrollerInner = styled.div`
  display: inline-block;
  min-width: 100%;
`;
export const ProjectScroller = ({ children, ...rest }) => (
  <ProjectScrollerWrapper {...rest} className={`${Classes.ELEVATION_1}`}>
    <ProjectScrollerInner>{children}</ProjectScrollerInner>
  </ProjectScrollerWrapper>
);
