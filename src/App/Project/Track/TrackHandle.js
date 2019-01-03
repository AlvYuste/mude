import React from 'react';
import { Icon, Colors } from '@blueprintjs/core';
import { SortableHandle as withSortableHandle } from 'react-sortable-hoc';
import styled from '@emotion/styled';
import { trackHandleWidth } from '../../../utils/variables';

const TrackHandleIcon = styled(Icon)`
  display: flex;
  align-items: center;
  cursor: row-resize;
  background-color: ${({ selected }) =>
    selected ? Colors.BLUE2 : Colors.DARK_GRAY3};
  color: ${({ selected }) => (selected ? Colors.WHITE : Colors.GRAY3)};
  width: ${trackHandleWidth};
`;

export const RawTrackHandle = ({ selected, ...rest }) => (
  <TrackHandleIcon {...rest} selected={selected} icon="drag-handle-vertical" />
);

export const TrackHandle = withSortableHandle(RawTrackHandle);
