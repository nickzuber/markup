'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as DocumentActions from '../actions/documentActions';
import {generatePid} from '../utilities/general';
import KramdownParser from 'kramed';
import Highlight from 'highlight.js';

const THROTTLE = 500;

/**
 * The `uniqueId` is used to pair together uneditable and editable document sections
 */
const propTypes = {
  text: React.PropTypes.string,
  editable: React.PropTypes.bool,
  style: React.PropTypes.object,
  uniqueId: React.PropTypes.string.isRequired
};

const defaultProps = {
  text: ''
};

class DocumentTextSection extends React.Component {

  constructor (props) {
    super(props);

    this.onKeyUp = this.onKeyUp.bind(this);
    this.onMathJaxLoaded = this.onMathJaxLoaded.bind(this);

    this._internalPID = generatePid();
    this.DOMParser = null;
    this.lastDocumentHeight = null;
    this.mathJaxScript = null;
    this.textThrottle = null;
    this.KramdownParser = KramdownParser.setOptions({
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: true,
      highlight: function (code) {
        return Highlight.highlightAuto(code).value;
      }
    });
  }

  componentDidMount () {
    document && document.querySelector(`.document-text-section[data-document-pid="${this.props.uniqueId}"]`).focus();
    this.DOMParser = new DOMParser();
    if (document.querySelector(`.-uneditable[data-document-pid="${this.props.uniqueId}"]`)) {
      this.lastResultHeight = document.querySelector(`.-uneditable[data-document-pid="${this.props.uniqueId}"]`).offsetHeight;
    } else {
      this.lastResultHeight = null;
    }
    this.initMathJax();
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.text !== this.props.text) {
      let DOMNode = this.getProcessedDOMNode(nextProps.text);
      this.purgeChildren(document.querySelector(`[data-text-pid="${this._internalPID}"]`));
      // Update content
      DOMNode.body && document.querySelector(`[data-text-pid="${this._internalPID}"]`).appendChild(DOMNode.body);
      // Update MathJax
      try {
        window.MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
      } catch (e) {
        console.warn('Unable to refresh MathJax upon content update.');
      }
    }

    if (this.lastResultHeight !== document.querySelector(`.-uneditable[data-document-pid="${this.props.uniqueId}"]`).offsetHeight &&
        document.querySelector(`.-uneditable[data-document-pid="${this.props.uniqueId}"]`)) {
      var newHeight = document.querySelector(`.-uneditable[data-document-pid="${this.props.uniqueId}"]`).offsetHeight;
      document.querySelector(`textarea.document-text-section[data-document-pid="${this.props.uniqueId}"]`).style.height = `${newHeight}px`;
      this.lastResultHeight = document.querySelector(`.-uneditable[data-document-pid="${this.props.uniqueId}"]`).offsetHeight;
    }
  }

  initMathJax () {
    if (!this.mathJaxScript) {
      this.mathJaxScript = document.createElement('script');
      this.mathJaxScript.src = 'https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML&delayStartupUntil=configured';
      this.mathJaxScript.onload = this.onMathJaxLoaded;
      this.mathJaxScript.onerror = () => {
        console.warn('There was a problem while trying to load MathJax for the first time.');
      };
      document.head.appendChild(this.mathJaxScript);
    }
  }

  onMathJaxLoaded () {
    window.MathJax.Hub.Config({
      TeX: {
        equationNumbers: {
          autoNumber: "AMS"
        }
      },
      tex2jax: {
        displayMath: [ ['$$', '$$'] ],
        processEscapes: true
      }
    });
    window.MathJax.Hub.Configured();
  }

  purgeChildren (DOMNode) {
    while (DOMNode.firstChild) {
      DOMNode.removeChild(DOMNode.firstChild);
    }
  }

  onKeyUp (event) {
    var newText = event.target.value;
    clearTimeout(this.textThrottle);
    this.textThrottle = setTimeout(() => {
      this.props.documentActions.updateText(newText);
    }, THROTTLE);
  }

  getProcessedDOMNode (rawText) {
    var processedText = rawText;

    // Check if valid text (even with defaultProps, this can still come back null
    // upon instanciation)
    if (!processedText) {
      return processedText;
    }

    // Parse markdown as Kramdown
    processedText = this.KramdownParser(processedText);

    // Parse HTML into DOM node
    var parsedDOMNode = this.DOMParser.parseFromString(processedText, 'text/html');

    return parsedDOMNode;
  }

  render() {
    if (this.props.editable) {
      return (
        <textarea
          style={this.props.style}
          className="document-text-section"
          data-document-pid={this.props.uniqueId}
          onKeyUp={this.onKeyUp}
          defaultValue={this.props.text} />
      );
    }

    // We append on new DOM node when props change
    return (
      <div
        style={this.props.style}
        data-document-pid={this.props.uniqueId}
        className="document-text-section -uneditable"
      >
        <div data-text-pid={this._internalPID} />
      </div>
    );
  }
};

DocumentTextSection.propTypes = propTypes;
DocumentTextSection.defaultProps = defaultProps;

const actions = (dispatch) => ({
  documentActions: bindActionCreators(DocumentActions, dispatch)
});

export default connect(null, actions)(DocumentTextSection);
