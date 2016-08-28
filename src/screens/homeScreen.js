'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {updateDocumentText} from '../actions/documentActions';

class HomeScreen extends React.Component {

  render() {
    console.warn(this.props);
    return (
      <div>
        <p onClick={() => {
          this.props.dispatch(updateDocumentText('test'));
        }}>
          home
        </p>
      </div>
    );
  }
};

const selector = (state) => ({
  appState: state
});

export default connect(selector)(HomeScreen);
