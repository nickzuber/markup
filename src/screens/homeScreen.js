'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Banner from '../components/banner';
import * as DocumentActions from '../actions/documentActions';

class HomeScreen extends React.Component {

  render() {
    return (
      <div>
        <Banner />
      </div>
    );
  }
};

const actions = (dispatch) => ({
  documentActions: bindActionCreators(DocumentActions, dispatch)
});

const selector = (state) => ({
  appState: state
});

export default connect(actions, selector)(HomeScreen);
