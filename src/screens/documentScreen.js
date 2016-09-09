'use strict';

import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Banner, {Mode} from '../components/banner';
import AppBody from '../components/appBody';
import DocumentTextSection from '../components/documentTextSection';
import * as DocumentActions from '../actions/documentActions';
import * as GeneralActions from '../actions/generalActions';
import router from '../router';

// Reflects the scrolling speed needed to trigger the banner animating to full
const SCROLL_EASING = 4;

const propTypes = {
  bannerMode: React.PropTypes.string
};

class DocumentScreen extends React.Component {

  constructor (props) {
    super(props);

    this.onScroll = this.onScroll.bind(this);

    this.lastPositionY = 0;
  }

  componentWillMount () {
    this.props.documentActions.hideAllPopups();
  }

  componentDidMount () {
    window && window.addEventListener('scroll', this.onScroll);
    this.props.documentActions.showFullBanner();
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
        this.props.documentActions.hideAllPopups();
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
            this.props.generalActions.unloadPage();
            setTimeout(() => {
              router.navigate('/', {trigger: true});
              // Slight toggle to make sure the CSS animation actually renders
              setTimeout(() => { this.props.generalActions.loadPage(); }, 1);
            }, 275);
          }}
        />
        <AppBody>
          <DocumentTextSection
            formatting={this.props.format}
            uniqueId={'document'}
            style={{float:'left'}}
            editable={true}
          />
          <DocumentTextSection
            uniqueId={'document'}
            style={{float:'right'}}
            editable={false}
            text={this.props.text}
          />
        </AppBody>
      </div>
    );
  }
};

DocumentScreen.propTypes = propTypes;

const actions = (dispatch) => ({
  documentActions: bindActionCreators(DocumentActions, dispatch),
  generalActions: bindActionCreators(GeneralActions, dispatch)
});

const selector = (state) => ({
  bannerMode: state.modes.banner,
  text: state.document.text,
  format: state.document.format
});

export default connect(selector, actions)(DocumentScreen);
