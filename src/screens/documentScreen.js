'use strict';

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Banner, { Mode } from '../components/banner'
import AppBody from '../components/appBody'
import DocumentTextSection from '../components/documentTextSection'
import * as DocumentActions from '../actions/documentActions'
import * as GeneralActions from '../actions/generalActions'
import router from '../router'
import Config from '../../config'

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

    this.state = { defaultText: null }
  }

  componentWillMount () {
    this.props.documentActions.hideAllPopups();
    
    // Check for a post hash in the URL
    if (this.props.postHash) {
      return this.props.documentActions.fetchPostFromHash(this.props.postHash)
    }

    // Check for local save data
    // Only update as default text if there isn't a posthash text ready
    const localSaveData = localStorage.getItem('markup-document-data')
    if (!this.props.fetch_post_text && localSaveData) {
      // NOTE: This ONLY works because this is set BEFORE the first render. We cannot
      // update `defaultValue` to a textarea component AFTER it mounts. So this is fine.
      this.setState((oldState) => ({ defaultText: localSaveData }))
      this.props.documentActions.updateText(localSaveData)
    }
  }

  componentDidMount () {
    window && window.addEventListener('scroll', this.onScroll)
    // Adding a delay here helps with loading lag causing the animation from playing properly.
    // This value can be fine tuned.
    setTimeout(() => this.props.documentActions.showFullBanner(), 100)
  }

  componentWillUnmount () {
    window && window.removeEventListener('scroll', this.onScroll);
    clearTimeout(this.animateIn);
  }

  componentWillReceiveProps (nextProps) {
    // We could also check the API call status here but I don't think we need to.
    if (this.props.fetch_post_text === null && nextProps.fetch_post_text !== null) {
      this.setState((oldState) => ({ defaultText: nextProps.fetch_post_text }))
      this.props.documentActions.updateText(nextProps.fetch_post_text)
    }
    // If we need to update the URL
    if (this.props.save_post_status === 'request' && nextProps.save_post_status === 'success') {
      window.history.pushState(null, null, `${Config.app.server.hostname}/edit/${nextProps.save_post_hash}`)
    }
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

  readyToLoadDocuments () {
    // No post hash then we're waiting on nothing.
    if (!this.props.postHash) return true

    // API call was fine, but no post matched the given hash.
    if (this.props.fetch_post_status === 'success' && this.props.fetch_post_text === null) {
      console.log('no post found with that hash')
    }

    // API call failed, we should display a message for this.
    if (this.props.fetch_post_status === 'failure') {
      console.log('api call failed')
    }

    // Waiting for API call, might want to display a message here.
    if (this.props.fetch_post_status === 'request') {
      console.log('loading...')
    }

    // Fetch status is successful, we can assume we've already loaded the text.
    return this.props.fetch_post_status === 'success'
  }

  render() {
    // There's a weird React bug with the textarea and `defaultValue` so we can't
    // update that field and expect the textarea to rerender correctly.
    // So basically we can only load defaultValue ONCE per app lifecycle, so choose carefully.
    // If there's a `postHash` with this render then we try to wait for the API call.

    return (
      <div className="document-wrapper">
        <Banner
          viewMode={this.props.bannerMode}
          onExit={() => {
            this.props.documentActions.hideBanner();
            this.props.documentActions.expandDocument(false);
            this.props.generalActions.unloadPage();
            setTimeout(() => {
              router.navigate('/', {trigger: true});
              // Slight toggle to make sure the CSS animation actually renders
              setTimeout(() => { this.props.generalActions.loadPage(); }, 1);
            }, 275);
          }}
        />
        {this.readyToLoadDocuments()
        ? (<AppBody>
            <DocumentTextSection
              formatting={this.props.format}
              text={this.state.defaultText}
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
          </AppBody>)
        : null}
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
  format: state.document.format,
  fetch_post_status: state.document.fetch_post_status,
  fetch_post_text: state.document.fetch_post_text,
  save_post_status: state.document.save_post_status,
  save_post_hash: state.document.save_post_hash,
});

export default connect(selector, actions)(DocumentScreen);
