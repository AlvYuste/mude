import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class Waveform extends Component {
  constructor(props) {
    super(props);
    this.wrapperRef = React.createRef();
  }

  async componentDidUpdate() {
    console.log(this.props.data);
  }

  render() {
    return <div ref={this.wrapperRef} />;
  }
}
Waveform.propTypes = {
  data: PropTypes.array,
};
Waveform.defaultProps = {
  data: [],
};
