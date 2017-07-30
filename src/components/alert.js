'use strict'

import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as DocumentActions from '../actions/documentActions'

const DEFAULT_TIME = 5 * 1000 // 5 seconds

export const AlertTypes = {
  SUCCESS: 'SUCCESS',
  WARNING: 'WARNING',
  FAILURE: 'FAILURE',
  LOG: 'LOG',
}

const propTypes = {
  isVisible: React.PropTypes.bool.isRequired,
  message: React.PropTypes.string,
  alertType: React.PropTypes.string,
}

class Alert extends React.Component {

  generateClass (alertType) {
    switch (alertType) {
      case AlertTypes.LOG:
        return '-alert-log'
      case AlertTypes.SUCCESS:
        return '-alert-success'
      case AlertTypes.WARNING:
        return '-alert-warning'
      case AlertTypes.FAILURE:
        return '-alert-failure'
    }
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.alert.show && nextProps.alert.show) {
      setTimeout(() => this.props.documentActions.hideAlert(), DEFAULT_TIME)
    }
  }

  isVisibleClass () {
    return this.props.isVisible
      ? ''
      : '-alert-hide'
  }

  render () {
    let alertType = Object.keys(AlertTypes).includes(this.props.alertType)
      ? this.props.alertType
      : AlertTypes.LOG

    return (
      <div className={`document-alert ${this.generateClass(alertType)} ${this.isVisibleClass()}`}>
        {this.props.message}
      </div>
    )
  }
}

Alert.propTypes = propTypes

const actions = (dispatch) => ({
  documentActions: bindActionCreators(DocumentActions, dispatch)
})

const selector = (state) => ({
  alert: state.document.alert,
})

export default connect(selector, actions)(Alert)
