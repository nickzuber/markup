'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as DocumentActions from '../actions/documentActions';
import router from '../router';

const propTypes = {
  text: React.PropTypes.string,
  editable: React.PropTypes.bool
};

const defaultProps = {
  text: ''
};

class DocumentTextSection extends React.Component {

  constructor (props) {
    super(props);

    this.onKeyUp = this.onKeyUp.bind(this);
  }

  componentDidMount () {
    document && document.querySelector('.document-text-section').focus();
  }

  onKeyUp (event) {
    this.props.documentActions.updateText(event.target.textContent);
  }

  parsedText () {
    var rawText = this.props.text;
    return rawText;
  }

  render() {
    return this.props.editable
      ? <div className="document-text-section" onKeyUp={this.onKeyUp} contentEditable="true" />
      : <div className="document-text-section -uneditable">{this.parsedText()}</div>
  }
};

DocumentTextSection.propTypes = propTypes;
DocumentTextSection.defaultProps = defaultProps;

const actions = (dispatch) => ({
  documentActions: bindActionCreators(DocumentActions, dispatch)
});

export default connect(null, actions)(DocumentTextSection);
