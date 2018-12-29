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
      ownProjects,
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
        {isAuthenticated && ownProjects && ownProjects.length && (
          <>
            <MenuItem icon="folder-open" text="Open..." label="Ctrl+O">
              {ownProjects.map(project => (
                <MenuItem
                  key={project.id}
                  text={project.name || '(Untitled project)'}
                  onClick={() => onOpenProject(project.id)}
                />
              ))}
            </MenuItem>
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
  ownProjects: PropTypes.arrayOf(PropTypes.object),
  onNewProject: PropTypes.func,
  onOpenProject: PropTypes.func,
  onSaveProject: PropTypes.func,
};
HeaderMenu.defaultProps = {
  isAuthenticated: false,
  ownProjects: [],
  onNewProject: () => {},
  onOpenProject: () => {},
  onSaveProject: () => {},
};
