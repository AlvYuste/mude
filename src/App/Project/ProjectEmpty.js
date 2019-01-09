import React from 'react';
import PropTypes from 'prop-types';

import { NonIdealState, Button, Intent } from '@blueprintjs/core';
import { Flex } from '../../components/layout/Flex';

export const ProjectEmpty = ({ onAddTrack, onRecord }) => (
  <NonIdealState
    icon="document"
    title="Project empty"
    description="Start recording or add an empty track to your project."
    action={
      <Flex spaced="items">
        <Button
          minimal
          intent={Intent.DANGER}
          icon="record"
          text="Start recording"
          onClick={onRecord}
        />
        <Button icon="plus" text="Add empty track" onClick={onAddTrack} />
      </Flex>
    }
  />
);
ProjectEmpty.propTypes = {
  onAddTrack: PropTypes.func,
  onRecord: PropTypes.func,
};
ProjectEmpty.defaultProps = {
  onAddTrack: () => {},
  onRecord: () => {},
};
