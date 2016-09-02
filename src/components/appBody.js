'use strict';

import React from 'react';
import {connect} from 'react-redux';

const propTypes = {
  bannerMode: React.PropTypes.string
}

class AppBody extends React.Component {

  render() {
    var classList = '-app-body-ref';
    if (!this.props.isLoaded) {
      classList += ' -fade-out';
    }
    
    return (
      <div className={classList}>
        {this.props.children}
      </div>
    );
  }
};

AppBody.propTypes = propTypes;

const selector = (state) => ({
  isLoaded: state.modes.appLoaded
});

export default connect(selector, null)(AppBody);
