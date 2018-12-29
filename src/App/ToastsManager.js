import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Toaster, Toast, Intent } from '@blueprintjs/core';
import { ERRORS_KEY, dismissErrorAction } from '../store/modules/errors';

export const RawToastsManager = ({ errors, dismissError }) => (
  <Toaster>
    {errors.map(error => (
      <Toast
        key={error.key}
        message={error.message}
        intent={Intent.DANGER}
        timeout={3000}
        onDismiss={() => dismissError(error.key)}
      />
    ))}
  </Toaster>
);
RawToastsManager.propTypes = {
  errors: PropTypes.array,
  dismissError: PropTypes.func.isRequired,
};
RawToastsManager.defaultProps = {
  errors: [],
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  errors: state[ERRORS_KEY],
});
const mapDispatchToProps = dispatch => ({
  dismissError: key => dispatch(dismissErrorAction(key)),
});
export const ToastsManager = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RawToastsManager);
