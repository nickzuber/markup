'use strict';

import React from 'react';
import {Provider} from 'react-redux';
import ReactDOM from 'react-dom';
import router from '../router';
import store from '../store';

import HomeScreen from './homeScreen';
import DocumentScreen from './documentScreen';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.callback = () => this.forceUpdate();
    router.on('route', this.callback);
  }

  componentWillUnmount() {
    router.off('route', this.callback);
  }

  renderInterfaceComponent() {
    switch(router.current) {
      case 'home':
        return <HomeScreen />;
      case 'edit':
        return <DocumentScreen />
      default:
        return <HomeScreen />;
    }
  }

  render() {
    return (
      <Provider store={store}>
        <div className='app-wrapper'>
          {this.renderInterfaceComponent()}
        </div>
      </Provider>
    );
  }
}

const AppWrapper = () => (
  <App />
);

ReactDOM.render(<AppWrapper />, document.getElementById('app'));
