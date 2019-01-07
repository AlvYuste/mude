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

export class ProjectMenu extends React.Component {
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
    const { onNewProject, onSaveProject, isAuthenticated } = this.props;
    return (
      <Popover
        minimal
        position={Position.BOTTOM_LEFT}
        content={
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
        }
      >
        <Button minimal icon="projects" text="Project" />
      </Popover>
    );
  }
}

ProjectMenu.propTypes = {
  isAuthenticated: PropTypes.bool,
  currentProject: PropTypes.object,
  ownProjects: PropTypes.arrayOf(PropTypes.object),
  onNewProject: PropTypes.func,
  onOpenProject: PropTypes.func,
  onSaveProject: PropTypes.func,
};
ProjectMenu.defaultProps = {
  isAuthenticated: false,
  currentProject: undefined,
  ownProjects: [],
  onNewProject: () => {},
  onOpenProject: () => {},
  onSaveProject: () => {},
};
