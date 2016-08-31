'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Banner, {Mode} from '../components/banner';
import * as DocumentActions from '../actions/documentActions';

class HomeScreen extends React.Component {

  constructor (props) {
    super(props);

    this.onScroll = this.onScroll.bind(this);

    this.lastPositionY = 0;
  }

  componentDidMount () {
    window && window.addEventListener('scroll', this.onScroll);
    this.props.documentActions.showFullBanner();
  }

  componentWillUnmount () {
    window && window.removeEventListener('scroll', this.onScroll);
  }

  onScroll (event) {
    if (!window) {
      throw new Error('Could not resolve window in DocumentScreen');
    }
    var newPositionY = window.pageYOffset || document.documentElement.scrollTop;
    if (newPositionY > this.lastPositionY) {
      if (this.props.bannerMode !== Mode.SHORT) {
        this.props.documentActions.showShortBanner();
      }
    } else {
      if (this.props.bannerMode !== Mode.FULL) {
        this.props.documentActions.showFullBanner();
      }
    }
    this.lastPositionY = newPositionY;
  }

  render() {
    return (
      <div className="document-wrapper">
        <Banner viewMode={this.props.bannerMode} />

      </div>
    );
  }
};

const actions = (dispatch) => ({
  documentActions: bindActionCreators(DocumentActions, dispatch)
});

const selector = (state) => ({
  bannerMode: state.modes.banner
});

export default connect(selector, actions)(HomeScreen);
