'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Banner, {Mode} from '../components/banner';
import * as DocumentActions from '../actions/documentActions';
import router from '../router';

// Reflects the scrolling speed needed to trigger the banner animating to full
const SCROLL_EASING = 4;

const propTypes = {
  bannerMode: React.PropTypes.string
}

class DocumentScreen extends React.Component {

  constructor (props) {
    super(props);

    this.onScroll = this.onScroll.bind(this);

    this.lastPositionY = 0;
  }

  componentWillMount () {
    this.props.documentActions.hideBanner();
  }

  componentDidMount () {
    window && window.addEventListener('scroll', this.onScroll);
    // Slight toggle on the banner animating into the screen for the first time
    // Make sure we clear this just incase someone leaves the view within the 1ms
    this.animateIn = setTimeout(() => {
      this.props.documentActions.showFullBanner()
    }, 1);
  }

  componentWillUnmount () {
    window && window.removeEventListener('scroll', this.onScroll);
    clearTimeout(this.animateIn);
  }

  onScroll (event) {
    if (!window) {
      throw new Error('Could not resolve window in DocumentScreen');
    }
    var newPositionY = window.pageYOffset || document.documentElement.scrollTop;

    // If we're close enough to the top, just show the full banner
    if (newPositionY <= 110) {
      if (this.props.bannerMode !== Mode.FULL) {
        this.props.documentActions.showFullBanner();
      }
      return;
    }

    if (newPositionY > this.lastPositionY) {
      if (this.props.bannerMode !== Mode.SHORT) {
        this.props.documentActions.showShortBanner();
      }
    } else {
      if (this.props.bannerMode !== Mode.FULL &&
          Math.abs(newPositionY - this.lastPositionY) > SCROLL_EASING) {
        this.props.documentActions.showFullBanner();
      }
    }
    this.lastPositionY = newPositionY;
  }

  render() {
    return (
      <div className="document-wrapper">
        <Banner
          viewMode={this.props.bannerMode}
          onExit={() => {
            this.props.documentActions.hideBanner();
            setTimeout(() => {router.navigate('/', {trigger: true})}, 275);
          }}
        />

      </div>
    );
  }
};

DocumentScreen.propTypes = propTypes;

const actions = (dispatch) => ({
  documentActions: bindActionCreators(DocumentActions, dispatch)
});

const selector = (state) => ({
  bannerMode: state.modes.banner
});

export default connect(selector, actions)(DocumentScreen);
