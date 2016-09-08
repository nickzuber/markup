'use strict';

import React from 'react';

const propTypes = {
  label: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired
};

class Button extends React.Component {

  render () {
    return (
      <input
        type="button"
        className="-custom-button-style"
        value={this.props.label}
        onClick={this.props.onClick}
      />
    );
  }
};

Button.propTypes = propTypes;

export default Button;
