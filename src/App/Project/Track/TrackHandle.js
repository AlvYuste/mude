import React from 'react';
import { Icon, Colors, Classes } from '@blueprintjs/core';
import { SortableHandle as withSortableHandle } from 'react-sortable-hoc';
import styled from '@emotion/styled';
import { TRACK_HANDLE_WIDTH } from '../../../utils/variables';

const TrackHandleIcon = styled(Icon)`
  display: flex;
  align-items: center;
  cursor: row-resize;
  background-color: ${({ selected }) =>
    selected ? Colors.BLUE2 : Colors.DARK_GRAY3};
  color: ${({ selected }) => (selected ? Colors.WHITE : Colors.GRAY3)};
  width: ${TRACK_HANDLE_WIDTH};
  position: sticky;
  left: 0;
  z-index: 5;
`;

export const RawTrackHandle = ({ selected, ...rest }) => (
  <TrackHandleIcon
    {...rest}
    selected={selected}
    className={`${Classes.ELEVATION_1}`}
    icon="drag-handle-vertical"
  />
);

export const TrackHandle = withSortableHandle(RawTrackHandle);
