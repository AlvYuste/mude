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

export class HeaderMenu extends React.Component {
  renderProjectMenu = () => {
    const { onNewProject, onSaveProject, isAuthenticated } = this.props;
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
            <MenuDivider title="Open project:" />
            {this.renderOpenProjectSubmenu()}
          </>
        )}
      </Menu>
    );
  };

  renderOpenProjectSubmenu = () => {
    const { onOpenProject, ownProjects, currentProject } = this.props;
    if (!ownProjects || !ownProjects.length) {
      return <MenuItem disabled text="(No projects saved)" />;
    }
    const isCurrentProject = id => !!currentProject && id === currentProject.id;
    return ownProjects
      .filter(p => !!p.id)
      .map(p => (
        <MenuItem
          key={p.id}
          disabled={isCurrentProject(p.id)}
          text={p.name || '(Untitled project)'}
          onClick={() => onOpenProject(p.id)}
          label={isCurrentProject(p.id) ? '(Opened)' : ''}
        />
      ));
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
  currentProject: PropTypes.object,
  ownProjects: PropTypes.arrayOf(PropTypes.object),
  onNewProject: PropTypes.func,
  onOpenProject: PropTypes.func,
  onSaveProject: PropTypes.func,
};
HeaderMenu.defaultProps = {
  isAuthenticated: false,
  currentProject: undefined,
  ownProjects: [],
  onNewProject: () => {},
  onOpenProject: () => {},
  onSaveProject: () => {},
};
