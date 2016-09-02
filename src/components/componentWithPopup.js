'use strict';

import React from 'react';
import {generatePid} from '../utilities/general';

const propTypes = {
  children: React.PropTypes.node.isRequired,
  message: React.PropTypes.node,
  style: React.PropTypes.object,
  forceHide: React.PropTypes.bool
};

const defaultProps = {
  message: '',
  forceHide: false
};

class ComponentWithPopup extends React.Component {

  constructor (props) {
    super(props);

    this.dismissPopup = this.dismissPopup.bind(this);

    // PID used for identifying this instance of popup component, so we can exclude
    // this particular component with the window's click event
    this._internalPID = generatePid();
    this.state = {
      showMessage: false
    }
  }

  componentDidMount () {
    window && window.addEventListener('click', this.dismissPopup);
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.forceHide && !!this.state.showMessage) {
      this.setState({
        showMessage: false
      });
    }
  }

  componentWillUnmount () {
    window && window.removeEventListener('click', this.dismissPopup);
  }

  dismissPopup (event) {
    // Only remove pop up if user clicks on something other than our popup item
    if (event.target.getAttribute('data-popup-pid') !== this._internalPID) {
      this.setState({
        showMessage: false
      });
    }
  }

  render () {
    var childrenWithProps = React.Children.map(this.props.children,
     (child) => React.cloneElement(child, {
       'data-popup-pid': this._internalPID
     })
    );
    return (
      <div
        className="popup-message-container"
        style={this.props.style}
        onClick={() => {
          this.setState({
            showMessage: true
          });
        }}
      >
        {childrenWithProps}
        {this.state.showMessage &&
          <PopUp
            message={this.props.message}
            pid={this._internalPID}
          />
        }
      </div>
    );
  }
}

function PopUp ({message, pid}) {
  return (
    <div className="popup-message" data-popup-pid={pid}>
      <div className="popup-arrow" />
      {message}
    </div>
  );
}

ComponentWithPopup.propTypes = propTypes;
ComponentWithPopup.defaultProps = defaultProps;

export default ComponentWithPopup;
