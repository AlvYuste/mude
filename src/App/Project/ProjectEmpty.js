import React from 'react';
import PropTypes from 'prop-types';

import { NonIdealState, Button } from '@blueprintjs/core';

export const ProjectEmpty = ({ onAction }) => (
  <NonIdealState
    icon="document"
    title="Project empty"
    description="Start adding tracks to your project."
    action={<Button icon="plus" text="Add track" onClick={onAction} />}
  />
);
ProjectEmpty.propTypes = {
  onAction: PropTypes.func,
};
ProjectEmpty.defaultProps = {
  onAction: () => {},
};
