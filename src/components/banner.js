'use strict';

import React from 'react';

const Mode = {
  HIDDEN: 'HIDDEN',
  SHORT:  'SHORT',
  FULL:   'FULL'
}

class Banner extends React.Component {

  static propTypes = {
    viewMode: React.PropTypes.string
  }

  static defaultProps = {
    viewMode: Mode.HIDDEN
  }

  render () {
    return (
      <div className="-document-banner">
        <div className="">
          <h1 className="-banner-title">markup</h1>
        </div>

        <div className="-banner-lower">
          <ul>
            <li>{/* bold */}</li>
            <li>{/* italic */}</li>
            <li>{/* quote */}</li>
            <li>{/* bullet list */}</li>
            <li>{/* number list */}</li>
            <li>{/* code */}</li>
            <li>{/* code */}</li>
            <li>{/* math */}</li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Banner;
