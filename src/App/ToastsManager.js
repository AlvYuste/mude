import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Toaster, Toast } from '@blueprintjs/core';
import { TOASTS_KEY, toastDismissAction } from '../store/modules/toasts';

export const RawToastsManager = ({ toasts, dismissToast }) => (
  <Toaster>
    {toasts.map(toast => (
      <Toast
        key={toast.key}
        message={toast.message}
        intent={toast.intent}
        timeout={3000}
        onDismiss={() => dismissToast(toast.key)}
      />
    ))}
  </Toaster>
);
RawToastsManager.propTypes = {
  toasts: PropTypes.array,
  dismissToast: PropTypes.func.isRequired,
};
RawToastsManager.defaultProps = {
  toasts: [],
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  toasts: state[TOASTS_KEY],
});
const mapDispatchToProps = dispatch => ({
  dismissToast: key => dispatch(toastDismissAction(key)),
});
export const ToastsManager = connect(
  mapStateToProps,
  mapDispatchToProps,
)(RawToastsManager);
