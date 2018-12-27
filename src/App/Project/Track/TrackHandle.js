import React from 'react';
import { Icon, Colors } from '@blueprintjs/core';
import { SortableHandle as withSortableHandle } from 'react-sortable-hoc';
import styled from '@emotion/styled';

const TrackHandleIcon = styled(Icon)`
  display: flex;
  align-items: center;
  cursor: row-resize;
  background-color: ${Colors.DARK_GRAY3};
  color: ${Colors.GRAY3};
`;

export const RawTrackHandle = props => (
  <TrackHandleIcon {...props} icon="drag-handle-vertical" />
);

export const TrackHandle = withSortableHandle(RawTrackHandle);
