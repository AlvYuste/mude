import React from 'react';
import { Colors } from '@blueprintjs/core';
import styled from '@emotion/styled';

const TrackContentWrapper = styled.div`
  background-color: ${Colors.DARK_GRAY1};
  cursor: crosshair;
`;

export const TrackContent = props => <TrackContentWrapper {...props} />;
