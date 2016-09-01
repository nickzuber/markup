'use strict';

import React from 'react';

export const Mode = {
  HIDDEN: 'HIDDEN',
  SHORT:  'SHORT',
  FULL:   'FULL'
};

export const APP_NAME = 'markup';

const propTypes = {
  viewMode: React.PropTypes.string,
  onExit: React.PropTypes.func.isRequired,
  isSticky: React.PropTypes.bool
};

const defaultProps = {
  viewMode: Mode.HIDDEN,
  isSticky: true
};

class Banner extends React.Component {

  getPosition () {
    switch (this.props.viewMode) {
      case Mode.HIDDEN:
        return {transform: 'translateY(-100%)'};
      case Mode.SHORT:
        // This is the height of the upper banner
        return {transform: 'translateY(-75px)'};
      case Mode.FULL:
      default:
        return {transform: 'translateY(0)'};
    }
  }

  render () {
    return (
      <div
        className="-document-banner"
        style={this.getPosition()}
      >
        <div className="-banner-upper">
          <h1
            className="-banner-title noselect"
            onClick={() => this.props.onExit()}
          >
            {APP_NAME}
          </h1>
          <div className="-banner-float-right">
            Unsaved
          </div>
        </div>

        <div className="-banner-lower">
          <ul>
            <li>{/* bold */}</li>
            <li>{/* italic */}</li>
            <li>{/* quote */}</li>
            <li>{/* bullet list */}</li>
            <li>{/* number list */}</li>
            <li>{/* code */}</li>
            <li>{/* code */}</li>
            <li>{/* math */}</li>
          </ul>
        </div>
      </div>
    );
  }
}

Banner.propTypes = propTypes;
Banner.defaultProps = defaultProps;

export default Banner;
