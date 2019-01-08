import React from 'react';
import PropTypes from 'prop-types';

import { NonIdealState, Button } from '@blueprintjs/core';

export const ProjectNotFound = ({ onAction }) => (
  <NonIdealState
    icon="path-search"
    title="Project not found"
    description="This project doesn't exist or you don't have permission to view it."
    action={<Button icon="plus" text="New project" onClick={onAction} />}
  />
);
ProjectNotFound.propTypes = {
  onAction: PropTypes.func,
};
ProjectNotFound.defaultProps = {
  onAction: () => {},
};
