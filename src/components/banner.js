'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as DocumentActions from '../actions/documentActions';
import { Formats } from './documentTextSection';
import ComponentWithPopup from './componentWithPopup';
import { getTimeMessage } from '../utilities/general'
import markupAPI from '../utilities/api'

export const Mode = {
  HIDDEN: 'HIDDEN',
  SHORT:  'SHORT',
  FULL:   'FULL'
};

const DOCUMENT_ID = 'document';

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

  saveDocument () {
    if (!localStorage) {
      // Throw proper error
      console.error('Unable to access local storage');
      return;
    }
    localStorage.setItem('markup-document-data', this.props.text);
    this.props.documentActions.saveDocument(Date.now());
  }

  shareDocument () {
    this.props.documentActions.createNewPost(this.props.text)
  }

  // Make sure we don't unselect anything
  applyFormattingSafely (e, format) {
    e.preventDefault();
    this.props.documentActions.requestFormatting(format);
    return false;
  }

  expandDocument () {
    this.props.documentActions.expandDocument(!this.props.is_expanded);
  }

  getBannerPosition () {
    switch (this.props.viewMode) {
      case Mode.SHORT:
        // This is the height of the upper banner
        return {transform: 'translateY(-70px)'};
      case Mode.FULL:
        return {transform: 'translateY(0)'};
      case Mode.HIDDEN:
      default:
        return {transform: 'translateY(-100%)'};
    }
  }

  getDivPosition () {
    switch (this.props.viewMode) {
      case Mode.SHORT:
        return {transform: 'translateY(52px)'};
      case Mode.FULL:
        return {transform: 'translateY(0)'};
      case Mode.HIDDEN:
      default:
        return {};
    }
  }

  generateLastSavedMessage () {
    const { date_last_saved } = this.props
    if (!date_last_saved) {
      return 'Work hasn\'t been saved yet'
    } 
    return getTimeMessage(Date.now() - date_last_saved)
  }

  generateLastSavedIcon () {
    const { date_last_saved } = this.props

    if (date_last_saved) {
      const timeInSeconds = (Date.now() - date_last_saved) / 1000
      // Under 5 minutes
      if (timeInSeconds < 60 * 5) {
        return <span className="icon-success" />
      }
      return <span className="icon-warning" />
    }
    return <span className="icon-error" />
  }

  render () {
    return (
      <div className="-document-banner" style={this.getBannerPosition()}>
        <div className="-banner-upper">
          {/* center header */}
          <h1
            className="-banner-title noselect"
            onClick={() => this.props.onExit()}
          >
            markup
          </h1>
          {/* Left */}
          <div className="-banner-float-right" style={this.getDivPosition()}>
            <div className="-banner-inner-side">
              {/* Share */}
              <span
                onClick={() => this.shareDocument()}
                className="-banner-text -banner-button -psuedo-link noselect">
                  Share document
              </span>

              {/* Save */}
              <span
                onClick={() => this.saveDocument()}
                className={'icon-cloud-alt -icon-size -icon-spacing'}>
              </span>

              {/* Expand */}
              {/* <span
                onClick={() => this.expandDocument()}
                className={`icon-file-outline -icon-size -icon-spacing ${expandIconStyle}`}>
              </span> */}

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
                <span className="icon-bell-alt -no-notifications -icon-size -icon-spacing"></span>
              </ComponentWithPopup>

              {/* Help */}
              <span className="icon-help -icon-size -icon-spacing"></span>
            </div>
          </div>
          {/* Right */}
          <div className="-banner-float-left" style={this.getDivPosition()}>
            <div className="-banner-inner-side">
              {this.generateLastSavedIcon()}
              <span className="-banner-text -last-saved-text noselect">{this.generateLastSavedMessage()}</span>
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
  showPopups: state.modes.popups,
  text: state.document.text,
  date_last_saved: state.document.date_last_saved,
  is_expanded: state.document.is_expanded,
});

export default connect(selector, actions)(Banner);
