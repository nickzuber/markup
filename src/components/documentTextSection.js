'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as DocumentActions from '../actions/documentActions';
import {generatePid} from '../utilities/general';
import KramdownParser from 'kramed';
import Highlight from 'highlight.js';
import Katex from 'katex';

const THROTTLE = 0;

const STATIC_PID = '_STATIC_PID'

// @TODO move this to constants file
export const Formats = {
  BOLD: 'BOLD',
  ITALIC: 'ITALIC',
  LINEBREAK: 'LINEBREAK',
  STRIKETHRU: 'STRIKETHRU',
  QUOTE: 'QUOTE',
  UL: 'UL',
  OL: 'OL',
  CODE: 'CODE',
  MATH: 'MATH'
};

/**
 * The `uniqueId` is used to pair together uneditable and editable document
 * sections if there is a need to do so.
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
    this._internalPID = STATIC_PID;
    this.DOMParser = null;
    this.lastDocumentHeight = null;
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
  }

  componentWillReceiveProps (nextProps) {
    // Update uneditable text
    if (nextProps.text !== this.props.text) {
      let processedText = this.transpileRawTextData(nextProps.text);
      document.querySelector(`[data-text-pid="${this._internalPID}"]`).innerHTML = processedText;
    }

    // Adjust height of textarea
    if (this.lastResultHeight !== document.querySelector(`.-uneditable[data-document-pid="${this.props.uniqueId}"]`).offsetHeight &&
      document.querySelector(`.-uneditable[data-document-pid="${this.props.uniqueId}"]`)) {
      let newHeight = document.querySelector(`.-uneditable[data-document-pid="${this.props.uniqueId}"]`).offsetHeight;
      document.querySelector(`textarea.document-text-section[data-document-pid="${this.props.uniqueId}"]`).style.height = `${newHeight}px`;
      this.lastResultHeight = document.querySelector(`.-uneditable[data-document-pid="${this.props.uniqueId}"]`).offsetHeight;
    }

    // Check for formatting button being pressed
    // If the new formatting is coming in null, ignore it (we're resetting)
    if (!!nextProps.formatting && this.props.formatting !== nextProps.formatting) {
      this.replaceSelectedText(nextProps.formatting);
      this.props.documentActions.resetFormatting();
    }
  }

  purgeChildren (DOMNode) {
    while (DOMNode.firstChild) {
      DOMNode.removeChild(DOMNode.firstChild);
    }
  }

  replaceSelectedText (format) {
    var textNodeDOM = document.querySelector(`textarea.document-text-section[data-document-pid="${this.props.uniqueId}"]`);
    var selectedText = null;

    if (textNodeDOM && typeof textNodeDOM.selectionStart === 'number') {
      let startPos = textNodeDOM.selectionStart;
      let endPos = textNodeDOM.selectionEnd;
      selectedText = textNodeDOM.value.substring(startPos, endPos);

      let blob = {
        selectedText,
        node: textNodeDOM,
        start: startPos,
        end: endPos
      };

      this.formatParser(format, blob);
      this.props.documentActions.updateText(textNodeDOM.value);
    }
  }

  formatParser (format, blob) {
    var {
      start,
      end,
      node,
      selectedText
    } = blob;

    switch (format) {
      case Formats.BOLD:
        node.value = this.replaceString(node.value, `**${selectedText}**`, start, end);
        node.setSelectionRange(start + 2, end + 2);
        break;
      case Formats.ITALIC:
        node.value = this.replaceString(node.value, `_${selectedText}_`, start, end);
        node.setSelectionRange(start + 1, end + 1);
        break;
      case Formats.LINEBREAK:
        node.value = this.replaceString(node.value, `\n\n---\n\n${selectedText}`, start, end);
        node.setSelectionRange(start + 7, end + 7);
        break;
      case Formats.STRIKETHRU:
        node.value = this.replaceString(node.value, `~~${selectedText}~~`, start, end);
        node.setSelectionRange(start + 2, end + 2);
        break;
      case Formats.QUOTE:
        node.value = this.replaceString(node.value, `\n\n> ${selectedText}`, start, end);
        node.setSelectionRange(start + 4, start + 4);
        break;
      case Formats.UL:
        node.value = this.replaceString(node.value, `\n - ${selectedText}`, start, end);
        node.setSelectionRange(start + 4, start + 4);
        break;
      case Formats.OL:
        node.value = this.replaceString(node.value, `\n1. ${selectedText}`, start, end);
        node.setSelectionRange(start + 4, start + 4);
        break;
      case Formats.CODE:
        node.value = this.replaceString(node.value, `\`${selectedText}\``, start, end);
        node.setSelectionRange(start + 1, start + 1);
        break;
      case Formats.MATH:
        node.value = this.replaceString(node.value, `${selectedText}$`, start, end);
        node.setSelectionRange(start + 2, start + 2);
        break;
      default:
        console.warn(`${format} is currently unsupported.`);
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

  replaceString (string, newText, start, end) {
    return string.slice(0, start) + newText + string.slice(end);
  }

  /**
   * It's important to note why we parse the text this way -- removing the expressions,
   * parsing the markdown, filling the expressions back in, and finally parsing the
   * expressions. This is because if we have something within an expression that
   * could be interpreted as markdown, the markdown parser will attempt to parse it:
   *
   * e.g.
   *
   *   Here is some _text_ and $n_i$ and some more _words_
   *
   * The `_` from `n_i` will connect with the first `_` in `_words_`, and the
   * markdown parser will break the expression attemping to parse this as markdown.
   * So we temporarily remove all of the expressions, parse the markdown, then put
   * them back into place to avoid this from happening.
   */
  transpileRawTextData (rawText) {
    if (!rawText) {
      return rawText;
    }

    // Store all of the expressions we extract from the raw text
    var purgedExpressions = [];

    // Extract expressions
    var expressionlessRawText = rawText.replace(/(\$)(?:(?=(\\?))\2.)*?\1/g, function (capturedGroup) {
      purgedExpressions.push(capturedGroup.replace(/([$]*)/g, ''));
      return '$ $';
    });

    // Parse markdown
    var markdownFormattedText = this.KramdownParser(expressionlessRawText);

    // Fill those expressions back in
    markdownFormattedText = markdownFormattedText.replace(/(\$)(?:(?=(\\?))\2.)*?\1/g, function (capturedGroup) {
      return `$${purgedExpressions.shift()}$`;
    });

    // Parse KaTeX
    try {
      let KatexParsedResult = markdownFormattedText.replace(/(\$)(?:(?=(\\?))\2.)*?\1/g, function (capturedGroup) {
        var cleanedString = capturedGroup.replace(/([$]*)/g, '');
        return Katex.renderToString(cleanedString);
      });
      return KatexParsedResult;
    } catch (err) {
      console.warn(err);
    }
    return markdownFormattedText;
  }

  render() {
    if (this.props.editable) {
      return (
        <textarea
          style={this.props.style}
          className="document-text-section"
          data-document-pid={this.props.uniqueId}
          onKeyUp={this.onKeyUp}
          defaultValue={this.props.text}
        />
      );
    }

    const expanded_class = this.props.is_expanded
      ? '-expanded-document'
      : ''

    // We append on new DOM node when props change
    return (
      <div
        style={this.props.style}
        data-document-pid={this.props.uniqueId}
        className={`document-text-section -uneditable ${expanded_class}`}
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

const selector = (state) => ({
  is_expanded: state.document.is_expanded
});

export default connect(selector, actions)(DocumentTextSection);
