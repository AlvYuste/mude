import React from 'react';
import styled from '@emotion/styled';
import { Classes } from '@blueprintjs/core';
import { CustomScroll } from '../../components/layout/CustomScroll';
import { mq } from '../../utils/mq';

const ProjectScrollerWrapper = styled(CustomScroll)`
  background-color: inherit;
  overflow-x: auto;
  overflow-y: auto;
  height: calc(100% - 3.5rem);
  ${mq.fromTablet} {
    height: calc(100% - 4.5rem);
  }
`;
const ProjectScrollerInner = styled.div`
  display: inline-block;
  position: relative;
  min-width: 100%;
`;
export const ProjectScroller = ({ children, ...rest }) => (
  <ProjectScrollerWrapper {...rest} className={`${Classes.ELEVATION_1}`}>
    <ProjectScrollerInner>{children}</ProjectScrollerInner>
  </ProjectScrollerWrapper>
);
