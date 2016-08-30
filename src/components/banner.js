'use strict';

import React from 'react';

class Banner extends React.Component {

  static propTypes = {
    miniatureMode: React.PropTypes.bool
  }

  static defaultProps = {
    miniatureMode: false
  }

  render () {
    return (
      <div className="-document-banner">

      </div>
    );
  }
}

export default Banner;
