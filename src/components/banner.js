'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as DocumentActions from '../actions/documentActions';
import {Formats} from './documentTextSection';
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

  // Make sure we don't unselect anything
  applyFormattingSafely (e, format) {
    e.preventDefault();
    this.props.documentActions.requestFormatting(format);
    return false;
  }

  getPosition () {
    switch (this.props.viewMode) {
      case Mode.SHORT:
        // This is the height of the upper banner
        return {transform: 'translateY(-75px)'};
      case Mode.FULL:
        return {transform: 'translateY(0)'};
      case Mode.HIDDEN:
      default:
        return {transform: 'translateY(-100%)'};
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
              {/* Save */}
              <span className="-banner-text -psuedo-link noselect">Save document</span>

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
                <span className="icon-bell-alt -notifications -icon-size -icon-spacing"></span>
              </ComponentWithPopup>

              {/* Help */}
              <span className="icon-help -icon-size -icon-spacing"></span>
            </div>
          </div>
          {/* Right */}
          <div className="-banner-float-left">
            <div className="-banner-inner-side">
              <span className="icon-success" />
              <span className="-banner-text -last-saved-text noselect">Last saved a moment ago</span>
            </div>
          </div>
        </div>

        <div className="-banner-lower">
          <ul className="-banner-icons">
            <li className="-bold" onMouseUp={(event) => this.applyFormattingSafely(event, Formats.BOLD)}>&nbsp;</li>
            <li className="-italic" onMouseUp={(event) => this.applyFormattingSafely(event, Formats.ITALIC)}>&nbsp;</li>
            <li className="-linebreak" onMouseUp={(event) => this.applyFormattingSafely(event, Formats.LINEBREAK)}>&nbsp;</li>
            <li className="-strikethru" onMouseUp={(event) => this.applyFormattingSafely(event, Formats.STRIKETHRU)}>&nbsp;</li>
            <li className="-quote" onMouseUp={(event) => this.applyFormattingSafely(event, Formats.QUOTE)}>&nbsp;</li>
            <li className="-ul" onMouseUp={(event) => this.applyFormattingSafely(event, Formats.UL)}>&nbsp;</li>
            <li className="-ol" onMouseUp={(event) => this.applyFormattingSafely(event, Formats.OL)}>&nbsp;</li>
            <li className="-code" onMouseUp={(event) => this.applyFormattingSafely(event, Formats.CODE)}>&nbsp;</li>
            <li className="-math" onMouseUp={(event) => this.applyFormattingSafely(event, Formats.MATH)}>&nbsp;</li>
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
