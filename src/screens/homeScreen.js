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
import router from '../router';

const defaultText = '### MarkUp\n\n> Markdown editing platform that supports MathJax and Kramdown markups.\n\nSupports **math** $$\Omega (n^2)=x$$ and _other_ markdown ~~stuff~~ features.';

class HomeScreen extends React.Component {

  componentWillMount () {
    this.props.documentActions.updateText(defaultText);
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
          <h2 className="-banner-sub-title noselect">Write beautiful and meaningful stuff.</h2>
          {/* Interactive example */}
          <div className="-landing-example-container">
            <Button
              label={'Create a new document'}
              onClick={() => this.routeToEdit()}
            />
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

        {/* FEATURES BLOCK */}
        <div>

        </div>
      </AppBody>
    );
  }
};

const actions = (dispatch) => ({
  documentActions: bindActionCreators(DocumentActions, dispatch),
  generalActions: bindActionCreators(GeneralActions, dispatch)
});

const selector = (state) => ({
  text: state.document.text
});

export default connect(selector, actions)(HomeScreen);
