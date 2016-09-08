'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as DocumentActions from '../actions/documentActions';
import ComponentWithPopup from './componentWithPopup';

export const Mode = {
  HIDDEN: 'HIDDEN',
  SHORT:  'SHORT',
  FULL:   'FULL'
};

const propTypes = {
  viewMode: React.PropTypes.string,
  onExit: React.PropTypes.func.isRequired
};

const defaultProps = {
  viewMode: Mode.HIDDEN
};

class Banner extends React.Component {

  componentWillReceiveProps (nextProps) {
    if (nextProps.showPopups === false) {
        this.props.documentActions.resetPopups();
    }
  }

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
          {/* center header */}
          <h1
            className="-banner-title noselect"
            onClick={() => this.props.onExit()}
          >
            markup
          </h1>
          {/* Left */}
          <div className="-banner-float-right">
            <div className="-banner-inner-side">
              {/* Settings */}
              <ComponentWithPopup
                forceHide={!this.props.showPopups}
                message={
                  <ul className="-ul-message">
                    <h2>Settings and Actions</h2>
                    <li>
                      <span className="icon-file" style={{marginRight: 10}}></span>
                      Create new document
                    </li>
                    <li>
                      <span className="icon-tag" style={{marginRight: 10}}></span>
                      Change title
                    </li>
                    <li>
                      <span className="icon-copy" style={{marginRight: 10}}></span>
                      Copy to clipboard
                    </li>
                    <li>
                      <span className="icon-refresh" style={{marginRight: 10}}></span>
                      Undo last change
                    </li>
                    <li>
                      <span className="icon-trash" style={{marginRight: 10}}></span>
                      Delete this document
                    </li>
                  </ul>
                }
              >
                <span className="-banner-text -psuedo-link noselect">Settings</span>
              </ComponentWithPopup>

              {/* Online */}
              <span className="icon-cloud-alt -icon-size -icon-spacing"></span>

              {/* Notifications */}
              <ComponentWithPopup
                forceHide={!this.props.showPopups}
                message={
                  <ul className="-ul-message">
                    <h2>There have been some updates.</h2>
                    <li>Check out the new updates</li>
                    <li>See our changelog</li>
                  </ul>
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
              <span className="icon-success" />
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

const actions = (dispatch) => ({
  documentActions: bindActionCreators(DocumentActions, dispatch)
});

const selector = (state) => ({
  showPopups: state.modes.popups
});

export default connect(selector, actions)(Banner);
