import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Popover,
  Menu,
  MenuItem,
  Position,
  MenuDivider,
} from '@blueprintjs/core';
import { MAX_ZOOM, MIN_ZOOM } from '../../utils/variables';

export const EditorMenu = ({
  zoom,
  onUndo,
  onRedo,
  undoStack,
  redoStack,
  onZoomIn,
  onZoomOut,
  onResetZoom,
}) => (
  <Popover
    minimal
    position={Position.BOTTOM_LEFT}
    content={
      <Menu>
        <MenuItem
          disabled={undoStack.length === 0}
          icon="undo"
          text="Undo"
          label="Ctrl+Z"
          onClick={onUndo}
        />
        <MenuItem
          disabled={redoStack.length === 0}
          icon="redo"
          text="Redo"
          label="Ctrl+Y"
          onClick={onRedo}
        />
        <MenuDivider />
        <MenuItem
          disabled={zoom === 1}
          icon="search"
          text="Reset zoom"
          label="Ctrl+0"
          onClick={onResetZoom}
        />
        <MenuItem
          disabled={zoom >= MAX_ZOOM}
          icon="zoom-in"
          text="Zoom in"
          label="Ctrl++"
          onClick={onZoomIn}
        />
        <MenuItem
          disabled={zoom <= MIN_ZOOM}
          icon="zoom-out"
          text="Zoom out"
          label="Ctrl+-"
          onClick={onZoomOut}
        />
      </Menu>
    }
  >
    <Button minimal icon="edit" text="Editor" />
  </Popover>
);

EditorMenu.propTypes = {
  undoStack: PropTypes.array,
  redoStack: PropTypes.array,
  zoom: PropTypes.number,
  onUndo: PropTypes.func,
  onRedo: PropTypes.func,
  onZoomIn: PropTypes.func,
  onZoomOut: PropTypes.func,
  onResetZoom: PropTypes.func,
};
EditorMenu.defaultProps = {
  undoStack: [],
  redoStack: [],
  zoom: 1,
  onUndo: () => {},
  onRedo: () => {},
  onZoomIn: () => {},
  onZoomOut: () => {},
  onResetZoom: () => {},
};
