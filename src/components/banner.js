'use strict';

import React from 'react';
import router from '../router';

export const Mode = {
  HIDDEN: 'HIDDEN',
  SHORT:  'SHORT',
  FULL:   'FULL'
};

const propTypes = {
  viewMode: React.PropTypes.string
};

const defaultProps = {
  viewMode: Mode.HIDDEN
};

class Banner extends React.Component {

  getPosition () {
    switch (this.props.viewMode) {
      case Mode.HIDDEN:
        return {transform: 'translateY(-100%)'};
      case Mode.SHORT:
        return {transform: 'translateY(-65%)'};
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
            onClick={() => router.navigate('/', {trigger: true})}
          >
            markup
          </h1>
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
