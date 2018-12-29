import React from 'react';
import PropTypes from 'prop-types';

import { Button, Popover, Menu, MenuItem, Position } from '@blueprintjs/core';

export class HeaderMenu extends React.Component {
  renderProjectMenu = () => {
    const {
      isAuthenticated,
      onNewProject,
      onOpenProject,
      onSaveProject,
    } = this.props;
    return (
      <Menu>
        <MenuItem
          icon="document"
          text="New"
          label="Ctrl+N"
          onClick={onNewProject}
        />
        <MenuItem
          icon="floppy-disk"
          text="Save"
          label="Ctrl+S"
          onClick={onSaveProject}
        />
        {isAuthenticated && (
          <>
            <MenuItem
              icon="folder-open"
              text="Open..."
              label="Ctrl+O"
              onClick={onOpenProject}
            />
            {/* <MenuItem icon="folder-shared-open" text="Open recent">
              <MenuItem text="Place for recent projects" />
            </MenuItem> */}
          </>
        )}
      </Menu>
    );
  };

  render() {
    return (
      <>
        <Popover
          minimal
          position={Position.BOTTOM_LEFT}
          content={this.renderProjectMenu()}
        >
          <Button minimal icon="projects" text="Project" />
        </Popover>
        {/* <Button minimal icon="edit" text="Edit" /> */}
      </>
    );
  }
}

HeaderMenu.propTypes = {
  isAuthenticated: PropTypes.bool,
  onNewProject: PropTypes.func,
  onOpenProject: PropTypes.func,
  onSaveProject: PropTypes.func,
};
HeaderMenu.defaultProps = {
  isAuthenticated: false,
  onNewProject: () => {},
  onOpenProject: () => {},
  onSaveProject: () => {},
};
