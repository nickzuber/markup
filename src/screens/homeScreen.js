'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Banner from '../components/banner';
import AppBody from '../components/appBody';
import * as DocumentActions from '../actions/documentActions';
import * as GeneralActions from '../actions/generalActions';
import router from '../router';

class HomeScreen extends React.Component {

  render() {
    return (
      <AppBody>
        <p onClick={() => {
          this.props.generalActions.unloadPage();
          setTimeout(() => {
            router.navigate('/edit', {trigger: true});
            // Slight toggle to make sure the CSS animation actually renders
            setTimeout(() => {this.props.generalActions.loadPage()}, 1);
          }, 275);
        }}>
          document
        </p>
      </AppBody>
    );
  }
};

const actions = (dispatch) => ({
  documentActions: bindActionCreators(DocumentActions, dispatch),
  generalActions: bindActionCreators(GeneralActions, dispatch)
});

const selector = (state) => ({
  appState: state
});

export default connect(selector, actions)(HomeScreen);
