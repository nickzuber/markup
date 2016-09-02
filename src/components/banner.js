'use strict';

import React from 'react';
import ComponentWithPopup from './componentWithPopup';

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

  getAutoSaveStyles () {
    // @TODO reducer for autosave being enabled
    // as a reminder, auto save will periodically store the draft in local storage
    if (false) {
      return {color: 'rgba(189, 241, 207, 1)'};
    }
    return {color: 'rgba(189, 241, 207, 0.4)'};
  }

  render () {
    return (
      <div
        className="-document-banner"
        style={this.getPosition()}
      >
        <div className="-banner-upper">
          {/* center header */}
          <h1
            className="-banner-title noselect"
            onClick={() => this.props.onExit()}
          >
            {APP_NAME}
          </h1>
          {/* Left */}
          <div className="-banner-float-right">
            <div className="-banner-inner-side">
              {/* Settings */}
              <ComponentWithPopup
                message={'test'}
              >
                <span className="-banner-text -psuedo-link noselect">Settings</span>
              </ComponentWithPopup>

              {/* Online */}
              <span className="icon-cloud-alt -icon-size -icon-spacing"></span>

              {/* Notifications */}
              <ComponentWithPopup
                message={
                  <p>hello world</p>
                }
              >
                <span className="icon-bell-alt -icon-size -icon-spacing"></span>
              </ComponentWithPopup>

              {/* Help */}
              <span className="icon-help -icon-size -icon-spacing"></span>
            </div>
          </div>
          {/* Right */}
          <div className="-banner-float-left">
            <div className="-banner-inner-side">
              <span
                className="icon-lightning -icon-size"
                style={this.getAutoSaveStyles()}
              />
              <span className="-banner-text -last-saved-text -psuedo-link noselect">Last saved a moment ago</span>
            </div>
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
