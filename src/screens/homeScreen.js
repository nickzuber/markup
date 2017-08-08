'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Banner from '../components/banner';
import AppBody from '../components/appBody';
import DocumentTextSection from '../components/documentTextSection';
import Button from '../components/button';
import * as DocumentActions from '../actions/documentActions';
import * as GeneralActions from '../actions/generalActions';
import Typed from 'typed-lite';
import router from '../router';

const defaultText = `markup
------

> Create & share TeX snippets with rich math typesetting and markdown support.

Supports _math_ **typesetting** like $T(n) = \\Theta (n^2)$ and markdown ~~stuff~~ features.`;

class HomeScreen extends React.Component {

  constructor (props) {
    super(props);

    this.typedText = null;
  }

  componentWillMount () {
    this.props.documentActions.updateText(defaultText);
  }

  componentDidMount () {
    var nodeDOM = document.querySelector('.-dynamic-typing-area');

    this.typedText = new Typed(nodeDOM, {
    	words: ['meaningful', 'beautiful', 'powerful', 'interesting', 'unique', 'wonderful', 'radical', 'sincere', 'organic'],
    	startDelay: 3000,
    	timing: 65,
    	backTiming: 40,
    	pause: 2500,
    	typoProbability: .05,
    	maxTypos: 1,
    	loop: true
    });

    this.typedText.start();
  }

  openInNewTab (url) {
    var win = window.open(url, '_blank');
    win.focus();
  }

  routeToEdit () {
    this.props.generalActions.unloadPage();
    setTimeout(() => {
      router.navigate('/edit', {trigger: true});
      // Slight toggle to make sure the CSS animation actually renders
      setTimeout(() => { this.props.generalActions.loadPage(); }, 1);
    }, 275);
  }

  render() {
    return (
      <AppBody>
        {/* LANDING BLOCK */}
        <div className="-homepage-landing-block">

          {/* Header */}
          <h1 className="-banner-title noselect">markup</h1>
          <h2 className="-banner-sub-title noselect">
            Write something&nbsp;
            <span className="-dynamic-typing-area">meaningful</span>
          </h2>

          {/* Interactive example */}
          <div className="-landing-example-container">
            <Button
              label={'Create a new document'}
              onClick={() => this.routeToEdit()}
            />
            <div className="-landing-example-document-container">
              <DocumentTextSection
                uniqueId={'home'}
                style={{float:'left'}}
                editable={true}
                text={defaultText}
              />
              <DocumentTextSection
                uniqueId={'home'}
                style={{float:'right'}}
                editable={false}
                text={this.props.text}
              />
            </div>
          </div>

          {/* SVG footer */}
          <div className="-landing-header-bottom-curve">
            <CurveComponent />
          </div>
        </div>

        {/* Left Sample Container */}
        <div className="section-with-side-sample-container">
          {/* Left Sample */}
          <div className="section-with-left-side-sample">
            <div className="-left-side">
              <img src="/img/samples/sample.png" />
            </div>
            <div className="-right-side">
              right
            </div>
          </div>

          {/* SVG footer */}
          <div className="-landing-header-bottom-curve-inverted">
            <CurveComponent color='#fff' />
          </div>
        </div>

        {/* Right Sample Container */}
        <div className="section-with-side-sample-container">

          {/* Right Sample */}
          <div className="section-with-right-side-sample">
            <div className="-left-side">
              left
            </div>
            <div className="-right-side">
              <img src="/img/samples/sample.png" />
            </div>
          </div>

          {/* SVG footer */}
          <div className="-landing-header-bottom-curve">
            <CurveComponent />
          </div>
        </div>
      </AppBody>
    );
  }
};

function CurveComponent (props) {
  const color = props.color || '#02b875'
  return (
    <svg preserveAspectRatio="none" width="54" height="14" viewBox="0 0 54 14" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <path fill={color} d="M 27 10C 21 12 14 14 0 14L 0 0L 54 0L 54 3C 40 3 33 8 27 10Z"></path>
    </svg>
  )
}

const actions = (dispatch) => ({
  documentActions: bindActionCreators(DocumentActions, dispatch),
  generalActions: bindActionCreators(GeneralActions, dispatch)
});

const selector = (state) => ({
  text: state.document.text
});

export default connect(selector, actions)(HomeScreen);

// {/* Sample posts section */}
// <div className="-all-samples-container">
//   {/* One sample */}
//   <div className="-sample-container">
//     <DocumentTextSection
//       uniqueId={'sample1'}
//       style={{
//         width: '500px',
//         padding: '20px 30px'
//       }}
//       editable={false}
//       text={defaultText}
//     />
//   </div>

//   {/* Two sample */}
//   <div className="-sample-container">
//     <DocumentTextSection
//       uniqueId={'sample2'}
//       style={{
//         width: '500px',
//         padding: '20px 30px'
//       }}
//       editable={false}
//       text={defaultText}
//     />
//   </div>

//   {/* Three sample */}
//   <div className="-sample-container">
//     <DocumentTextSection
//       uniqueId={'sample3'}
//       style={{
//         width: '500px',
//         padding: '20px 30px'
//       }}
//       editable={false}
//       text={defaultText}
//     />
//   </div>
// </div>