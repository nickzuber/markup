'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as DocumentActions from '../actions/documentActions';
import {generatePid} from '../utilities/general';
import KramdownParser from 'kramed';
import Highlight from 'highlight.js';

const propTypes = {
  text: React.PropTypes.string,
  editable: React.PropTypes.bool,
  style: React.PropTypes.object
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
    this.KramdownParser = KramdownParser.setOptions({
      highlight: function (code) {
        return Highlight.highlightAuto(code).value;
      }
    });
  }

  componentDidMount () {
    document && document.querySelector('.document-text-section').focus();
    this.DOMParser = new DOMParser();
    this.lastResultHeight = document.querySelector('.-uneditable').offsetHeight;
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
        window.MathJax.Hub.Queue(["Typeset",MathJax.Hub]);
      } catch (e) {
        console.warn('Unable to refresh MathJax upon content update.')
      }
    }

    if (this.lastResultHeight !== document.querySelector('.-uneditable').offsetHeight) {
      var newHeight = document.querySelector('.-uneditable').offsetHeight;
      document.querySelector('textarea.document-text-section').style.height = `${newHeight}px`;
      this.lastResultHeight = document.querySelector('.-uneditable').offsetHeight;
    }
  }

  initMathJax () {
    if (!this.mathJaxScript) {
      this.mathJaxScript = document.createElement('script');
      this.mathJaxScript.src = 'https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_HTML&delayStartupUntil=configured';
      this.mathJaxScript.onload = this.onMathJaxLoaded;
      this.mathJaxScript.onerror = () => {
        console.warn('There was a problem while trying to load MathJax for the first time.')
      }
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
        inlineMath: [ ['$','$'] ],
        displayMath: [ ['$$','$$'] ],
        processEscapes: true,
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
    // @TODO onlny call this if the text changes
    this.props.documentActions.updateText(event.target.value);
  }

  getProcessedDOMNode (rawText) {
    var processedText = rawText;

    // Check if valid text (even with defaultProps, this can still come back null
    // upon instanciation)
    if (!processedText) {
      return processedText;
    }

    // Clean HTML
    processedText = processedText.replace(/</gmi, '&lt;');
    processedText = processedText.replace(/>/gmi, '&gt;');
    processedText = processedText.replace(/\&/gmi, '&amp;');
    processedText = processedText.replace(/\"/gmi, '&quot;');
    processedText = processedText.replace(/\'/gmi, '&#39;');

    // Parse markdown as Kramdown
    processedText = this.KramdownParser(processedText);

    // Parse HTML into DOM node
    var parsedDOMNode = this.DOMParser.parseFromString(processedText, 'text/html');

    return parsedDOMNode;
  }

  render() {
    if (this.props.editable) {
      return (
        <textarea style={this.props.style} className="document-text-section" onKeyUp={this.onKeyUp} />
      );
    }

    // We append on new DOM node when props change
    return (
      <div style={this.props.style} className="document-text-section -uneditable">
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
