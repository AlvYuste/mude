import React from 'react';
import PropTypes from 'prop-types';
import { Button, Popover, Menu, MenuItem, Position } from '@blueprintjs/core';

export const EditMenu = ({ onUndo, onRedo, undoStack, redoStack }) => (
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
      </Menu>
    }
  >
    <Button minimal icon="edit" text="Edit" />
  </Popover>
);

EditMenu.propTypes = {
  undoStack: PropTypes.array,
  redoStack: PropTypes.array,
  onUndo: PropTypes.func,
  onRedo: PropTypes.func,
};
EditMenu.defaultProps = {
  undoStack: [],
  redoStack: [],
  onUndo: () => {},
  onRedo: () => {},
};
